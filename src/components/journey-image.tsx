import { cn } from '@/lib/utils';
import { Image } from '@unpic/react';
import React from 'react';

const JourneyImage = ({
  src,
  width = 160,
  height = 120,
  className,
}: {
  src: string;
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <div className='w-[100px] md:w-40'>
      <Image
        src={src}
        alt='journey image'
        width={width}
        height={height}
        className={cn(
          'w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]',
          className,
        )}
      />
    </div>
  );
};

export default JourneyImage;
