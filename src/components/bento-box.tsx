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
        'bg-darker border-fg z-10 h-fit w-full rounded-3xl border p-4',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default BentoBox;
