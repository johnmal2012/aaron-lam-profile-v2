'use client';

import Link from 'next/link';
import { Menu, Stethoscope } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
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
import { cn } from '@/lib/utils';
import { NavItem } from '@/lib/types/navigation';

interface NavbarProps {
  navItems: NavItem[];
  logo: string;
  specialty: string;
  clinicName: string;
  linkName: string;
  footCareLink: string;
}

export default function Navbar({
  navItems,
  logo,
  specialty,
  clinicName,
  linkName,
  footCareLink,
}: NavbarProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const sections = useMemo(
    () =>
      navItems.map((item) => ({
        id: item.id,
      })),
    [navItems],
  );

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) => ({
        ...section,
        element: document.getElementById(section.id),
      }));

      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      if (isBottom && sectionElements.length > 0) {
        setActiveSection(sectionElements.at(-1)!.id);
        return;
      }

      const scrollPosition = window.innerHeight * 0.35;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];

        if (!section.element) continue;

        const rect = section.element.getBoundingClientRect();

        if (rect.top <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <header className="sticky top-0 z-50 border-b bg-stone-100/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100">
            <Stethoscope className="h-5 w-5 text-blue-700" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-slate-900 sm:text-lg">
              <Link href="#hero">{logo}</Link>
            </h1>

            <p className="truncate text-[11px] text-slate-500 sm:text-xs">
              <Link href="#hero">{specialty}</Link>
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600',
                )}
              >
                {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
              </Link>
            );
          })}
          <Link
            href={footCareLink}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap font-medium text-sm hover:text-blue-700 hover:underline underline-offset-2 decoration-1 hover:decoration-2"
          >
            {linkName}
          </Link>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
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

            <SheetContent
              side="right"
              className="
                w-50
                max-w-55
                border-l
                bg-stone-100
                p-6
                h-full
                overflow-y-auto
                pb-[env(safe-area-inset-bottom)]
                "
            >
              <SheetHeader className="pb-2">
                <SheetTitle className="text-lg font-semibold tracking-tight text-slate-900">
                  {clinicName}
                </SheetTitle>
                <SheetDescription className="text-sm text-slate-500">
                  {logo}
                </SheetDescription>
              </SheetHeader>

              <nav className="mt-2 flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <SheetClose asChild key={item.id}>
                      <Link
                        key={item.id}
                        href={`#${item.id}`}
                        className={cn(
                          'rounded-xl px-4 py-3 text-base font-medium transition-all',
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600',
                        )}
                      >
                        {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                      </Link>
                    </SheetClose>
                  );
                })}
                <SheetClose asChild>
                  <Link
                    href={footCareLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="not-first:rounded-xl px-4 py-3 text-base font-medium transition-all text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:underline underline-offset-2 decoration-1 hover:decoration-2"
                  >
                    {linkName}
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
