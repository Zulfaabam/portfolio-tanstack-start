import { boxClasses } from '@/lib/consts';
import { cn } from '@/lib/utils';
import Chip from './ui/chip';
import { motion } from 'framer-motion';
import { createSwapy } from 'swapy';
import { useEffect } from 'react';

export interface TechStack {
  id: number;
  name: string;
}

export interface TechStackBoxProps {
  techStack: TechStack[];
  className?: string;
}

export default function TechStackBox({
  techStack,
  className,
}: TechStackBoxProps) {
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
      className={cn('mx-auto flex w-full flex-col gap-2', className)}
    >
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
    </motion.div>
  );
}
