import { cn } from '@/lib/utils';
import React from 'react';

function BentoBox({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'bg-darker border-fg/60 hover:border-fg z-10 h-fit w-full rounded-2xl border p-4 transition-all ease-in',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default BentoBox;
