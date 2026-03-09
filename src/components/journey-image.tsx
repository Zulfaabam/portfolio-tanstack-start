import { cn } from '@/lib/utils';
import { Image } from '@unpic/react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';

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
  const [isZoomed, setIsZoomed] = useState(false);
  const layoutId = useId();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isZoomed]);

  const modalContent = (
    <AnimatePresence>
      {isZoomed && (
        <div className='z-1000 fixed inset-0 flex items-center justify-center p-4 md:p-12'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='bg-dark/40 fixed inset-0 backdrop-blur-md'
            onClick={() => setIsZoomed(false)}
          />

          <motion.div
            layoutId={layoutId}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className='z-1001 relative max-h-full max-w-full cursor-zoom-out overflow-hidden rounded-2xl shadow-2xl'
            onClick={() => setIsZoomed(false)}
          >
            <Image
              src={src}
              alt='journey image zoomed'
              layout='fullWidth'
              className='h-auto max-h-[85vh] w-auto max-w-[90vw] object-contain'
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.div
        className='w-[100px] cursor-pointer md:w-32 lg:w-40'
        onClick={() => setIsZoomed(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div layoutId={layoutId} className='h-full w-full'>
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
        </motion.div>
      </motion.div>

      {typeof document !== 'undefined' &&
        createPortal(modalContent, document.body)}
    </>
  );
};

export default JourneyImage;
