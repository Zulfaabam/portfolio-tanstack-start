import { cn } from '@/lib/utils';
import React from 'react';

export interface SectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export default function Section({ children, id, className }: SectionProps) {
  return (
    <section
      className={cn(
        'mx-auto max-w-5xl px-4 py-12 xl:max-w-7xl xl:py-20 min-[1300px]:px-0',
        className,
      )}
      id={id}
    >
      {children}
    </section>
  );
}
