import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { createSwapy } from 'swapy';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import RippleButton from './ui/ripple-btn';
import { Image } from '@unpic/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTechStack } from '@/lib/server/tech-stack';
import { techStack as techStackBackup } from '@/lib/consts';

export interface TechStack {
  id: number;
  name: string;
}

export interface TechStackBoxProps {
  // techStack: TechStack[];
  className?: string;
}

export default function TechStackBox({
  // techStack,
  className,
}: TechStackBoxProps) {
  const {
    data,
    error,
    isLoading: loadingTechStack,
    refetch,
  } = useQuery({
    queryKey: ['techStack'],
    queryFn: () => getTechStack(),
  });

  const queryClient = useQueryClient();

  const techStack = data?.data ?? techStackBackup;

  const sortedStackId = structuredClone(techStack)
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    .map((d) => d.id.toString());

  const shuffle = () => {
    console.log('shuffle');
  };

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

    const swapy = createSwapy(container, {
      swapMode: 'hover',
    });

    swapy.onSwapEnd(({ data }) => {
      const checkRightAnswer = (arr2: (string | null)[]) =>
        data.array.map((d) => d.itemId).length === arr2.length &&
        data.array
          .map((d) => d.itemId)
          .every((element, index) => element === arr2[index]);

      if (checkRightAnswer(sortedStackId)) {
        triggerConfetti();
        console.log('correct');
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
        'mx-auto flex h-full w-full flex-col-reverse gap-4 md:flex-row md:gap-[36px] lg:justify-between',
        className,
      )}
    >
      <div className='flex w-full justify-end md:hidden'>
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
      </div>
      <div className='h-full *:h-full *:w-full *:lg:w-[218px]'>
        <div className='swapy-container mx-auto flex size-40 flex-col justify-between border border-dashed p-1'>
          {techStack?.map((tech, idx) => (
            <div data-swapy-slot={idx + 1} key={tech.id}>
              <div data-swapy-item={tech.id}>
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
          <h6 className='font-pixelify-sans font-medium'>Play the Stack!</h6>
          <p className='text-sm'>
            Try to reorder my tech stack for a surprise!
          </p>
        </div>
        <RippleButton className='md:flex! hidden self-end' onClick={shuffle}>
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
      </div>
    </motion.div>
  );
}
