import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'motion/react';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { menu } from '@/lib/consts';
import { cn } from '@/lib/utils';

export interface Position {
  left: number;
  width: number;
  opacity: number;
}

export default function Navbar() {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === 'number') {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (current == 1 || direction == 1 || direction < 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      // if (scrollYProgress.get() < 0.05) {
      //   setVisible(false);
      // } else {
      //   if (direction < 0) {
      //     setVisible(true);
      //   } else {
      //     setVisible(false);
      //   }
      // }
    }
  });

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className='fixed inset-x-0 top-4 z-20'
      >
        <SlideNav />
      </motion.div>
    </AnimatePresence>
  );
}

const SlideNav = () => {
  const matchRoute = useMatchRoute();

  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className='border-dark bg-fg relative mx-auto flex w-fit rounded-full border-2 p-1'
    >
      {menu.map((m) => (
        <Menu key={m.id} setPosition={setPosition}>
          <Link
            to={m.path}
            className={cn('transition-all duration-300', {
              'underline decoration-wavy': matchRoute({ to: m.path }),
            })}
          >
            {m.title}
          </Link>
        </Menu>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

const Menu = ({
  children,
  setPosition,
}: {
  children: string | React.ReactNode;
  setPosition: Dispatch<SetStateAction<Position>>;
}) => {
  const ref = useRef<null | HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className='text-fg relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase mix-blend-difference md:px-5 md:py-2.5 md:text-sm'
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className='bg-dark absolute z-0 h-7 rounded-full md:h-10'
    />
  );
};
