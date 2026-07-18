import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export const DirectionAwareHover = ({
  imageUrl,
  children,
  childrenClassName,
  imageClassName,
  className,
}: {
  imageUrl: string;
  children: React.ReactNode | string;
  childrenClassName?: string;
  imageClassName?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<
    'top' | 'bottom' | 'left' | 'right' | string
  >('left');

  const shouldReduceMotion = useReducedMotion();

  const variants = {
    initial: {
      transform: 'translate(0px, 0px)',
    },
    exit: {
      transform: 'translate(0px, 0px)',
    },
    top: {
      transform: shouldReduceMotion ? 'translate(0px, 0px)' : 'translate(0px, 12px)',
    },
    bottom: {
      transform: shouldReduceMotion ? 'translate(0px, 0px)' : 'translate(0px, -12px)',
    },
    left: {
      transform: shouldReduceMotion ? 'translate(0px, 0px)' : 'translate(12px, 0px)',
    },
    right: {
      transform: shouldReduceMotion ? 'translate(0px, 0px)' : 'translate(-12px, 0px)',
    },
  };

  const textVariants = {
    initial: {
      transform: 'translate(0px, 0px)',
      opacity: 0,
    },
    exit: {
      transform: 'translate(0px, 0px)',
      opacity: 0,
    },
    top: {
      transform: shouldReduceMotion ? 'translate(0px, 0px)' : 'translate(0px, 2px)',
      opacity: 1,
    },
    bottom: {
      transform: shouldReduceMotion ? 'translate(0px, 0px)' : 'translate(0px, -2px)',
      opacity: 1,
    },
    left: {
      transform: shouldReduceMotion ? 'translate(0px, 0px)' : 'translate(-2px, 0px)',
      opacity: 1,
    },
    right: {
      transform: shouldReduceMotion ? 'translate(0px, 0px)' : 'translate(2px, 0px)',
      opacity: 1,
    },
  };

  const updateDirection = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!ref.current) return;
    const direction = getDirection(event, ref.current);
    switch (direction) {
      case 0:
        setDirection('top');
        break;
      case 1:
        setDirection('right');
        break;
      case 2:
        setDirection('bottom');
        break;
      case 3:
        setDirection('left');
        break;
      default:
        setDirection('left');
        break;
    }
  };

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    updateDirection(event);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isHovered) {
      setIsHovered(false);
      return;
    }
    updateDirection(event);
    setIsHovered(true);
  };

  const getDirection = (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    obj: HTMLElement,
  ) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect();
    const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
    const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      ref={ref}
      className={cn(
        'group/card relative h-full w-full overflow-hidden rounded-lg bg-transparent',
        className,
      )}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          className='relative h-full w-full'
          initial='initial'
          animate={isHovered ? direction : 'initial'}
          exit='exit'
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className='absolute inset-0 z-10 h-full w-full bg-black/60'
          />
          <motion.div
            variants={variants}
            className='relative h-full w-full select-none bg-gray-50 dark:bg-black'
            transition={{
              duration: 0.25,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <img
              alt='image'
              className={cn(
                'h-full w-full scale-[1.15] select-none object-cover',
                imageClassName,
              )}
              width='1000'
              height='1000'
              src={imageUrl}
            />
          </motion.div>
          <motion.div
            variants={textVariants}
            transition={{
              duration: 0.25,
              ease: [0.23, 1, 0.32, 1],
            }}
            className={cn(
              'text-text absolute bottom-4 left-4 z-40',
              childrenClassName,
            )}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};


