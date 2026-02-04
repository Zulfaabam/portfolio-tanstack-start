import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import Chip from './chip';
import { Image } from '@unpic/react';
import { motion } from 'motion/react';
import { useMatchRoute } from '@tanstack/react-router';
import { ProjectTechStack } from 'types';
import { cn } from '@/lib/utils';

export interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  tech_stack?: ProjectTechStack[];
  github_url: string;
  live_url: string;
  idx: number;
  className?: string;
  imageClassName?: string;
}

export default function ProjectCard({
  image,
  title,
  description,
  tech_stack,
  github_url,
  live_url,
  idx,
  className,
  imageClassName,
}: ProjectCardProps) {
  const matchRoute = useMatchRoute();

  const isProjectsPage = matchRoute({ to: '/projects' });

  return (
    <motion.div
      // initial={{ opacity: 0, y: -10 }}
      // whileInView={{ opacity: 1, y: 0 }}
      // transition={{
      //   delay: isProjectsPage ? 0 : idx * 0.2,
      //   duration: isProjectsPage ? 0.75 : 0.5,
      // }}
      // viewport={{
      //   once: true,
      //   amount:
      //     typeof window !== 'undefined' && window.innerWidth < 1024
      //       ? 0.1
      //       : isProjectsPage
      //         ? 0.2
      //         : 0.65,
      // }}
      className={cn(
        'bg-dark-gray flex flex-col justify-between rounded-lg shadow-[0_0_4px_0px_rgba(234,240,245,0.6)]',
        className,
      )}
    >
      <div className='space-y-1 lg:space-y-2'>
        <motion.div
          // whileHover={{
          //   scale: 1.5,
          //   zIndex: 10,
          //   translateY: 60,
          //   skewY: idx % 2 === 0 ? 2 : -2,
          // }}
          className={cn(
            'relative aspect-video w-full cursor-zoom-in rounded-lg hover:shadow-md hover:shadow-neutral-700',
            imageClassName,
          )}
        >
          <Image
            src={image ? image : '/no-image.svg'}
            alt={title}
            layout='fullWidth'
            className='h-full w-full rounded-t-lg object-cover'
          />
        </motion.div>
        <div className='space-y-0.5 px-4'>
          <div className='flex items-center'>
            {tech_stack?.map((tech, idx) => (
              <p
                key={tech.id}
                className='text-fg space-x-1 text-[10px] font-light uppercase'
              >
                <span>{tech.name}</span>
                {idx !== tech_stack.length - 1 && (
                  <span className='mr-1'>/</span>
                )}
              </p>
            ))}
          </div>
          <h6 className='text-fg text-xl'>{title}</h6>
        </div>
      </div>
      <div className='flex w-full flex-col justify-between gap-2 px-4 pb-4'>
        <p className='text-fg/80 line-clamp-3 text-xs font-light md:text-sm'>
          {description}
        </p>
        <div className='h-px w-full bg-[#d9d9d9]'></div>
        <div className='flex items-center justify-between gap-1 text-xs font-light uppercase lg:gap-2'>
          {!github_url && !live_url && (
            <p className='text-fg font-light'>Privated</p>
          )}
          {github_url && (
            <motion.a
              whileHover={{ translateY: -2 }}
              href={github_url}
              className='text-fg flex cursor-pointer items-center justify-center'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='flex items-center gap-1'>
                Github <IconBrandGithub strokeWidth={1.5} size={16} />
              </span>
            </motion.a>
          )}
          {live_url && (
            <motion.a
              whileHover={{ translateY: -2 }}
              href={live_url}
              className='text-fg flex cursor-pointer items-center justify-center'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='flex items-center gap-1'>
                Live Demo <IconExternalLink strokeWidth={1.5} size={16} />
              </span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
