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
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMenu2,
  IconMoon,
  IconSun,
  IconX,
} from '@tabler/icons-react';
import { useTheme } from './ThemeContext';

export interface Position {
  left: number;
  width: number;
  opacity: number;
}

const SOCIALS = [
  {
    name: 'GitHub',
    url: 'https://github.com/Zulfaabam',
    icon: <IconBrandGithub className='social-icon' />,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/zfaabam/',
    icon: <IconBrandInstagram className='social-icon' />,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/zulfa-fatah-akbar-ahmad/',
    icon: <IconBrandLinkedin className='social-icon' />,
  },
];

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
      <motion.nav
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
        className='fixed inset-x-0 top-4 z-20 mx-auto max-w-[calc(100vw-1rem)] xl:max-w-7xl'
      >
        <SlideNav />
      </motion.nav>
    </AnimatePresence>
  );
}

const SlideNav = () => {
  const { userTheme, setTheme } = useTheme();
  const matchRoute = useMatchRoute();
  const [isOpen, setIsOpen] = useState(false);

  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const getNextTheme = () => {
    if (userTheme.includes('dark')) {
      return 'light';
    } else {
      return 'dark';
    }
  };

  return (
    <div
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className='border-border bg-bg relative mx-auto flex w-full flex-col gap-2 rounded-xl border px-2 py-1 sm:flex-row sm:items-center sm:justify-between md:px-4'
    >
      <div className='flex w-full items-center justify-between sm:max-w-fit'>
        <div className='text-text font-jetbrains-mono w-fit text-sm md:text-base'>
          <p>Abams-Folio</p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label='Toggle menu'
          className='transition-all duration-300 hover:-translate-y-0.5 sm:hidden'
        >
          {isOpen ? (
            <IconX className='text-text' />
          ) : (
            <IconMenu2 className='text-text' />
          )}
        </button>
      </div>

      <ul className='hidden items-center justify-center sm:flex'>
        {menu.map((m) => (
          <Menu key={m.id} setPosition={setPosition}>
            <Link
              to={m.path}
              target={m?.isOutsideLink ? '_blank' : undefined}
              rel={m?.isOutsideLink ? 'noopener noreferrer' : undefined}
              className={cn('transition-all duration-300', {
                'underline decoration-wavy': matchRoute({ to: m.path }),
              })}
            >
              {m.title}
            </Link>
          </Menu>
        ))}
      </ul>

      <Cursor position={position} />

      <div className='hidden items-center justify-center gap-4 sm:flex'>
        {SOCIALS.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target='_blank'
            rel='noopener noreferrer'
            className='transition-all duration-300 hover:-translate-y-0.5'
          >
            {s.icon}
          </a>
        ))}
        <div className='bg-muted h-4 w-px'></div>
        <button
          onClick={() => setTheme(getNextTheme())}
          className='cursor-pointer transition-all duration-300'
        >
          <span className='inline dark:hidden'>
            <IconMoon size={18} className='text-text' />
          </span>
          <span className='hidden dark:inline'>
            <IconSun size={18} className='text-text' />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className='flex flex-col overflow-hidden sm:hidden'
          >
            <ul className='flex flex-col items-center justify-center gap-2 py-2'>
              {menu.map((m) => (
                <li key={m.id} className='w-full'>
                  <Link
                    to={m.path}
                    target={m?.isOutsideLink ? '_blank' : undefined}
                    rel={m?.isOutsideLink ? 'noopener noreferrer' : undefined}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-text block w-full py-2 text-center text-xs uppercase transition-all duration-300',
                      {
                        'underline decoration-wavy': matchRoute({ to: m.path }),
                      },
                    )}
                  >
                    {m.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className='border-border/50 flex items-center justify-center gap-4 border-t pb-2 pt-4'>
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='transition-all duration-300 hover:-translate-y-0.5'
                >
                  {s.icon}
                </a>
              ))}
              <div className='bg-muted h-4 w-px'></div>
              <button
                onClick={() => setTheme(getNextTheme())}
                className='cursor-pointer transition-all duration-300'
              >
                <span className='inline dark:hidden'>
                  <IconMoon size={18} className='text-text' />
                </span>
                <span className='hidden dark:inline'>
                  <IconSun size={18} className='text-text' />
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
      className='relative z-10 block cursor-pointer px-2 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-2.5 md:text-sm'
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
      className='bg-text absolute z-0 h-7 rounded-xl md:h-10'
    />
  );
};
