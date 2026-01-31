import { cn } from '@/lib/utils';
import React from 'react';

type RippleButtonProps<E extends React.ElementType> = {
  as?: E;
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<E>;

function RippleButton<E extends React.ElementType = 'button'>({
  as,
  children,
  className,
  ...props
}: RippleButtonProps<E>) {
  const Component = as || 'button';

  return (
    <Component
      className={cn(
        'btn-rounded transition-all hover:-translate-y-px active:scale-[0.97]',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

function RippleButtonText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={className}>{children}</span>;
}

function RippleButtonIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={className}>{children}</span>;
}

RippleButton.Text = RippleButtonText;
RippleButton.Icon = RippleButtonIcon;

export default RippleButton;
