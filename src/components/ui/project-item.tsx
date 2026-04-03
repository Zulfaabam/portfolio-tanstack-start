import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { Image } from '@unpic/react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'motion/react';
import { useState } from 'react';
import { ProjectTechStack } from 'types';
import { cn } from '@/lib/utils';

export interface ProjectShowcaseCardProps {
  image: string;
  title: string;
  description: string;
  tech_stack?: ProjectTechStack[];
  github_url: string;
  live_url: string;
  className?: string;
  imageClassName?: string;
}

export default function ProjectItem({
  image,
  title,
  description,
  tech_stack,
  github_url,
  live_url,
  className,
  imageClassName,
}: ProjectShowcaseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, amount: 0.2 }}
      className={cn(
        'hover:bg-white/2 group relative flex flex-col items-start gap-4 border-b border-neutral-800 py-6 transition-colors last:border-b-0 sm:flex-row sm:gap-6 md:px-4 md:py-8',
        className,
      )}
    >
      <div
        className={cn(
          'relative w-full shrink-0 overflow-hidden rounded-lg bg-neutral-900 sm:w-40',
          imageClassName,
        )}
      >
        <Image
          src={image ? image : '/no-image.svg'}
          alt={title}
          layout='fullWidth'
          className='aspect-video w-full object-cover'
        />
      </div>

      {/* Content */}
      <div className='flex w-full flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <h3 className='text-fg text-lg font-bold sm:text-xl'>{title}</h3>
          <div className='flex items-center gap-3'>
            {!github_url && !live_url && (
              <span className='text-fg/50 text-xs'>Private Project</span>
            )}
            {github_url && (
              <a
                href={github_url}
                className='text-fg/50 hover:text-primary transition-all hover:scale-110'
                target='_blank'
                rel='noopener noreferrer'
                title='GitHub Repository'
              >
                <IconBrandGithub size={20} strokeWidth={1.5} />
              </a>
            )}
            {live_url && (
              <a
                href={live_url}
                className='text-fg/50 hover:text-primary transition-all hover:scale-110'
                target='_blank'
                rel='noopener noreferrer'
                title='Live Demo'
              >
                <IconExternalLink size={20} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>

        <p className='text-fg/70 text-sm leading-relaxed'>{description}</p>

        <div className='flex flex-wrap items-center gap-2 pt-1 md:gap-3'>
          {tech_stack?.map((tech, idx) => (
            <div
              key={tech.id}
              className='text-fg/50 flex items-center space-x-2 text-[10px] uppercase tracking-wider md:text-xs'
            >
              <span>{tech.name}</span>
              {idx !== tech_stack.length - 1 && (
                <span className='text-fg/30'>•</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Tooltip Image */}
      <AnimatePresence>
        {isHovered && (
          <motion.img
            src={image ? image : '/no-image.svg'}
            alt={`${title} preview`}
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.1,
            }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.1 } }}
            className='z-100 pointer-events-none fixed left-0 top-0 hidden aspect-video w-80 rounded-xl border border-neutral-800 bg-neutral-900 object-cover shadow-2xl md:block'
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
