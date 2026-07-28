'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type NavLinkProps = React.ComponentPropsWithoutRef<typeof Link>;

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, className, children, ...props }, ref) => {
    const pathname = usePathname();

    const active = pathname === href;

    return (
      <Link
        ref={ref}
        href={href}
        {...props}
        className={cn(
          'inline-flex items-center justify-center rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200',
          active
            ? 'border-blue-600 bg-blue-600 text-white'
            : 'border-transparent text-foreground hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600',
          className,
        )}
      >
        {children}
      </Link>
    );
  },
);

NavLink.displayName = 'NavLink';