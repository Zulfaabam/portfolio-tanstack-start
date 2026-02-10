import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { createSwapy } from 'swapy';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import RippleButton from './ui/ripple-btn';
import { Image } from '@unpic/react';
import { useQuery } from '@tanstack/react-query';
import { getTechStack } from '@/lib/server/tech-stack';
import { techStack as techStackBackup } from '@/lib/consts';

export interface TechStackBoxProps {
  className?: string;
}

export default function TechStackBox({ className }: TechStackBoxProps) {
  const {
    data: techStack,
    error,
    isLoading: loadingTechStack,
  } = useQuery({
    queryKey: ['techStack'],
    queryFn: () => getTechStack(),
    placeholderData: {
      data: techStackBackup,
      error: null,
    },
  });

  const triggerConfetti = () => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ['star'],
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ['circle'],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  useEffect(() => {
    const container = document.querySelector('.swapy-container');

    if (!container) return;

    const swapy = createSwapy(container!, {
      swapMode: 'hover',
    });

    swapy.onSwapEnd(({ data }) => {
      const sortedStack = structuredClone(
        data.array.map((d) => d.itemId as string),
      ).sort((a, b) => {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });

      const checkRightAnswer = (arr2: (string | null)[]) =>
        data.array.map((d) => d.itemId).length === arr2.length &&
        data.array
          .map((d) => d.itemId)
          .every((element, index) => element === arr2[index]);

      if (checkRightAnswer(sortedStack)) {
        triggerConfetti();
      }
    });

    return () => {
      swapy.destroy();
    };
  }, []);

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className={cn(
        'mx-auto flex h-full w-full flex-col-reverse gap-4 md:flex-row md:gap-9 lg:justify-between',
        className,
      )}
    >
      {/* <div className='flex w-full justify-end md:hidden'>
        <RippleButton>
          <RippleButton.Text>Shuffle</RippleButton.Text>
          <RippleButton.Icon>
            <Image
              src='/icons/reload.svg'
              alt='reload'
              width={22}
              height={22}
            />
          </RippleButton.Icon>
        </RippleButton>
      </div> */}
      <div className='h-[244px] md:w-1/2 lg:h-full'>
        <div className='swapy-container flex h-full w-full flex-col justify-between border border-dashed p-1 lg:w-[218px]'>
          {techStack?.data?.map((tech, idx) => (
            <div data-swapy-slot={idx + 1} key={tech.id}>
              <div data-swapy-item={tech.name}>
                <div className='bg-fg text-darker cursor-pointer py-0.5 text-center'>
                  <p className='font-pixelify-sans text-[13px]'>{tech.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col justify-between md:w-1/2'>
        <div className='space-y-6'>
          <h6 className='font-pixelify-sans text-lg font-medium leading-6'>
            Play the Stack!
          </h6>
          <p className='text-sm'>
            Try to reorder my tech stack for a surprise!
          </p>
        </div>
        {/* <RippleButton className='md:flex! hidden self-end' onClick={shuffle}>
          <RippleButton.Text>Shuffle</RippleButton.Text>
          <RippleButton.Icon>
            <Image
              src='/icons/reload.svg'
              alt='reload'
              width={22}
              height={22}
            />
          </RippleButton.Icon>
        </RippleButton> */}
      </div>
    </motion.div>
  );
}
