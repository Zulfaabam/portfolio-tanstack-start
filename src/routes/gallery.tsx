import ErrorContent from '@/components/error-content';
import Section from '@/components/section';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { galleryImages } from '@/lib/consts';

export const Route = createFileRoute('/gallery')({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'Abams Gallery' },
      {
        name: 'description',
        content: "Abam's collection of photos",
      },
    ],
  }),
  errorComponent: ({ reset }) => (
    <div className='bg-dark relative flex min-h-screen w-full items-center'>
      <Section
        id='error-gallery'
        className='flex flex-col items-center justify-center gap-2'
      >
        <ErrorContent reset={() => reset()} />
      </Section>
    </div>
  ),
  component: Gallery,
});

type Photo = {
  img: HTMLImageElement;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
};

function Gallery() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photosRef = useRef<Photo[]>([]);
  const cameraRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });
  const initializedRef = useRef(false);

  const size = useWindowSize();

  // Initialization logic to load images and scatter them across the virtual canvas
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    if (typeof window !== 'undefined') {
      cameraRef.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
    }

    galleryImages.forEach((item) => {
      const img = new globalThis.Image();
      img.crossOrigin = 'anonymous';
      img.src = item.src;
      img.onload = () => {
        // Fix photo dimensions
        const targetWidth = 280;
        const targetHeight = (img.height / img.width) * targetWidth;

        // Scatter photos around the center
        const spreadX = Math.max(window.innerWidth * 1.5, 1200);
        const spreadY = Math.max(window.innerHeight * 1.5, 1200);
        const x = (Math.random() - 0.5) * spreadX;
        const y = (Math.random() - 0.5) * spreadY;
        const angle = (Math.random() - 0.5) * 0.4; // Max rotation of ~22 degrees

        photosRef.current.push({
          img,
          title: item.title,
          x,
          y,
          width: targetWidth,
          height: targetHeight,
          angle,
        });
      };
    });
  }, []);

  // Setup rendering & interaction logic every time the window size changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let isDraggingCamera = false;
    let draggingPhotoIdx = -1;
    let dragOffset = { x: 0, y: 0 };
    let lastMouse = { x: 0, y: 0 };
    let animationFrameId: number;

    const onDown = (e: PointerEvent) => {
      const pos = { x: e.clientX, y: e.clientY };
      lastMouse = pos;

      let hitIdx = -1;
      const photos = photosRef.current;
      const camera = cameraRef.current;

      // Check hit detection from top to bottom
      for (let i = photos.length - 1; i >= 0; i--) {
        const p = photos[i];
        const paperWidth = p.width + 30;
        const paperHeight = p.height + 80;

        // Mouse offset relative to the canvas center
        const cx = pos.x - camera.x;
        const cy = pos.y - camera.y;

        // Offset relative to the specific photo
        const dx = cx - p.x;
        const dy = cy - p.y;

        // Rotate pointer collision back to AABB (Axis-Aligned Bounding Box) coordinates
        const cos = Math.cos(-p.angle);
        const sin = Math.sin(-p.angle);
        const localX = dx * cos - dy * sin;
        const localY = dx * sin + dy * cos;

        if (
          localX >= -paperWidth / 2 &&
          localX <= paperWidth / 2 &&
          localY >= -paperHeight / 2 &&
          localY <= paperHeight / 2
        ) {
          hitIdx = i;
          break;
        }
      }

      if (hitIdx !== -1) {
        draggingPhotoIdx = hitIdx;
        // Pop photo and push it back to bring it to the front
        const [dragged] = photos.splice(hitIdx, 1);
        photos.push(dragged);
        draggingPhotoIdx = photos.length - 1;

        const p = photos[draggingPhotoIdx];
        dragOffset = {
          x: pos.x - camera.x - p.x,
          y: pos.y - camera.y - p.y,
        };
        document.body.style.cursor = 'grabbing';
      } else {
        isDraggingCamera = true;
        document.body.style.cursor = 'move';
      }
    };

    const onMove = (e: PointerEvent) => {
      if (draggingPhotoIdx === -1 && !isDraggingCamera) return;

      const pos = { x: e.clientX, y: e.clientY };
      const camera = cameraRef.current;
      const photos = photosRef.current;

      if (draggingPhotoIdx !== -1) {
        // Move photo
        const p = photos[draggingPhotoIdx];
        p.x = pos.x - camera.x - dragOffset.x;
        p.y = pos.y - camera.y - dragOffset.y;
      } else if (isDraggingCamera) {
        // Pan camera
        const dx = pos.x - lastMouse.x;
        const dy = pos.y - lastMouse.y;
        camera.x += dx;
        camera.y += dy;
      }

      lastMouse = pos;
    };

    const onUp = () => {
      isDraggingCamera = false;
      draggingPhotoIdx = -1;
      document.body.style.cursor = 'default';
    };

    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    // Animation Render Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const camera = cameraRef.current;
      const photos = photosRef.current;

      photos.forEach((p) => {
        ctx.save();
        ctx.translate(camera.x + p.x, camera.y + p.y);
        ctx.rotate(p.angle);

        const paperWidth = p.width + 30;
        const paperHeight = p.height + 80;

        // Draw Polaroid Drop Shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 10;

        // Draw Polaroid White Paper Frame
        ctx.fillStyle = '#fdfdfd';
        ctx.fillRect(
          -paperWidth / 2,
          -paperHeight / 2,
          paperWidth,
          paperHeight,
        );

        // Reset shadow to prevent image and text from having shadows
        ctx.shadowColor = 'transparent';

        // Draw Photo Image
        ctx.drawImage(
          p.img,
          -p.width / 2,
          -paperHeight / 2 + 15,
          p.width,
          p.height,
        );

        // Draw subtle inner border around the photo
        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        ctx.lineWidth = 1;
        ctx.strokeRect(-p.width / 2, -paperHeight / 2 + 15, p.width, p.height);

        // Draw Text Title
        ctx.fillStyle = '#333';
        ctx.font = '16px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.title, 0, paperHeight / 2 - 25);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      document.body.style.cursor = 'default';
    };
  }, [size.width, size.height]);

  return (
    <div className='bg-darkest relative z-10 h-screen w-full overflow-hidden'>
      <div className='text-fg/80 pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/40 px-4 py-2 text-sm backdrop-blur-md'>
        Drag canvas to pan, drag photos to move
      </div>
      <canvas
        ref={canvasRef}
        className='absolute inset-0 block h-full w-full touch-none'
      />
    </div>
  );
}
