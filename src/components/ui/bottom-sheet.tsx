import React, { useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { IconX } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const BottomSheet = ({
  isOpen,
  onClose,
  children,
  className,
  title,
}: BottomSheetProps) => {
  // Prevent scrolling when the bottom sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='bg-bg/80 fixed inset-0 z-50 backdrop-blur-sm'
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            drag='y'
            dragConstraints={{ top: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            className={cn(
              'border-border bg-surface rounded-t-4xl fixed inset-x-0 bottom-0 z-50 flex h-[85vh] flex-col border-t shadow-2xl md:h-[90vh]',
              className,
            )}
          >
            {/* Handle bar */}
            <div className='flex w-full justify-center py-4'>
              <div className='bg-muted/30 h-1.5 w-12 rounded-full' />
            </div>

            {/* Header */}
            <div className='flex items-center justify-between px-4 sm:px-6'>
              <h3 className='text-text text-base font-semibold sm:text-xl'>
                {title}
              </h3>
              <button
                onClick={onClose}
                className='text-muted hover:text-text bg-surface2 flex size-8 cursor-pointer items-center justify-center rounded-full text-base transition-colors sm:text-xl'
              >
                <IconX size={20} />
              </button>
            </div>

            {/* Content */}
            <div className='thin-scrollbar flex-1 overflow-y-auto px-4 pb-10'>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};
