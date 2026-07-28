'use client';

import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { adminNavItems } from '@/lib/admin/navitems';
import { NavLink } from '@/components/shared/nav-link';

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-12 w-12" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-50! max-w-[75vw]!">
        <SheetHeader>
          <SheetTitle className="pl-4 text-lg font-semibold tracking-tight text-slate-900">
            Admin Menu
          </SheetTitle>
          <SheetDescription className="text-sm text-slate-500">
            {undefined}
          </SheetDescription>
        </SheetHeader>
        <nav className="mt-2 flex flex-col gap-2 px-4">
          {adminNavItems.map((item) => (
            <SheetClose asChild key={item.href}>
              <NavLink href={item.href} className="justify-start w-36 pl-4">
                {item.title}
              </NavLink>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
