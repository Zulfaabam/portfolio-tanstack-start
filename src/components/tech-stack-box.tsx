import { cn } from '@/lib/utils';
import { motion, Reorder } from 'motion/react';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import RippleButton from './ui/ripple-btn';
import { Image } from '@unpic/react';
import { useQuery } from '@tanstack/react-query';
import { getTechStack } from '@/lib/server/tech-stack';

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
  });

  const [techStackOrder, setTechStackOrder] = useState<string[]>([]);
  const [disableTransition, setDisableTransition] = useState(false);

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

  const onReorder = (newOrder: string[]) => {
    setTechStackOrder(newOrder);

    const sortedStack = structuredClone(newOrder).sort((a, b) => {
      if (a < b) return -1;

      if (a > b) return 1;

      return 0;
    });

    const checkRightAnswer = (arr2: (string | null)[]) =>
      newOrder.map((d) => d).length === arr2.length &&
      newOrder.map((d) => d).every((element, index) => element === arr2[index]);

    if (checkRightAnswer(sortedStack)) {
      setTimeout(() => {
        triggerConfetti();
      }, 500);
    }
  };

  const onShuffle = () => {
    setDisableTransition(true);
    setTechStackOrder((prev) => {
      const newOrder = structuredClone(prev);
      newOrder.sort(() => Math.random() - 0.5);
      return newOrder;
    });

    setTimeout(() => {
      setDisableTransition(false);
    }, 600);
  };

  useEffect(() => {
    if (techStack?.data) {
      setTechStackOrder(techStack.data.map((tech) => tech.name));
    }
  }, [techStack]);

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
      <div className='flex w-full justify-end md:hidden'>
        <RippleButton onClick={onShuffle}>
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
      <div className='h-[244px] md:w-1/2 lg:h-full'>
        <Reorder.Group
          values={techStackOrder ?? []}
          onReorder={onReorder}
          className='flex h-full w-full flex-col justify-between border border-dashed p-1 lg:w-[218px]'
        >
          {techStackOrder.map((tech) => (
            <Reorder.Item
              key={tech}
              value={tech}
              initial={{ y: -10, filter: 'blur(10px)', opacity: 0 }}
              whileInView={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
              transition={
                disableTransition
                  ? undefined
                  : {
                      duration: 0.6,
                      delay:
                        0.1 *
                        (techStackOrder.length - techStackOrder.indexOf(tech)),
                      ease: [0.4, 0, 0.2, 1],
                    }
              }
              viewport={{ once: true }}
              onDragStart={() => setDisableTransition(true)}
              onDragEnd={() => setDisableTransition(false)}
            >
              <div className='bg-fg text-darker cursor-pointer py-0.5 text-center'>
                <p className='font-pixelify-sans text-[13px]'>{tech}</p>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
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
        <RippleButton className='md:flex! hidden self-end' onClick={onShuffle}>
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
