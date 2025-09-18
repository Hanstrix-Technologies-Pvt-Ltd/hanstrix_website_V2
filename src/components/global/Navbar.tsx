'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Menu, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const serviceLinks = [
    { name: 'AI & Machine Learning', href: '/services/ai-ml' },
    { name: 'Customized ERP Software', href: '/services/erp-software' },
    { name: 'Website Development', href: '/services/website-development' },
    { name: 'Digital Marketing', href: '/services/digital-marketing' },
  ];

  const handleNavLinkClick = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hover underline baseline
  const linkBase =
    'inline-flex items-center leading-none text-lg relative text-white transition-colors ' +
    'hover:text-cyan-400 ' +
    'after:content-[""] after:absolute after:left-0 after:bottom-[-6px] ' +
    'after:h-0.5 after:w-full after:bg-cyan-400 after:origin-left ' +
    'after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300';

  const isHomeActive = pathname === '/';
  const isServicesActive = pathname?.startsWith('/services') ?? false;
  const isContactActive = pathname === '/contact';

  // Keep initial client render identical to server (solid bg) and only enhance after mount.
  const navBG =
    mounted && scrolled
      ? 'bg-black/60 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,255,0.4)]'
      : 'bg-black';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 py-2 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${navBG}`}
      suppressHydrationWarning
    >
      <div className="container container-gutters mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white flex items-center">
          <Image
            src="/images/final_logo.png"
            alt="Hanstrix Technologies Logo"
            width={210}
            height={40}
            className="object-contain py-2"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Home */}
          <Link
            href="/"
            aria-current={isHomeActive ? 'page' : undefined}
            className={`${linkBase} ${isHomeActive ? '!text-cyan-400 hover:after:scale-x-0' : ''}`}
            prefetch={false}
          >
            Home
          </Link>

          {/* Services (ALWAYS a <button> trigger) */}
          <DropdownMenu onOpenChange={setIsServicesDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-current={isServicesActive ? 'page' : undefined}
                className={`${linkBase} flex items-center ${
                  isServicesActive ? '!text-cyan-400 hover:after:scale-x-0' : ''
                } focus:outline-none`}
              >
                Services
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    isServicesDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 bg-[#07070b]/95 border border-gray-700 text-white shadow-lg rounded-md mt-2 backdrop-blur-sm">
              {serviceLinks.map((service, index) => (
                <React.Fragment key={service.name}>
                  <DropdownMenuItem asChild>
                    <Link
                      href={service.href}
                      className={`flex items-center px-4 py-2 rounded-md transition-colors text-base ${
                        pathname === service.href
                          ? 'text-cyan-400 bg-gray-800'
                          : 'text-white hover:bg-gray-700'
                      }`}
                      onClick={handleNavLinkClick}
                      prefetch={false}
                    >
                      {service.name}
                    </Link>
                  </DropdownMenuItem>
                  {index < serviceLinks.length - 1 && (
                    <DropdownMenuSeparator className="bg-gray-700 my-1" />
                  )}
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* About */}
          <Link href="/#about" className={linkBase} prefetch={false}>
            About Us
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            aria-current={isContactActive ? 'page' : undefined}
            className={`${linkBase} ${isContactActive ? '!text-cyan-400 hover:after:scale-x-0' : ''}`}
            prefetch={false}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button aria-label="Open menu">
                <Menu size={36} className="text-white cursor-pointer" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[250px] sm:w-[300px] bg-black/95 border-r border-gray-700 p-6 flex flex-col items-start space-y-4 text-white backdrop-blur-lg"
            >
              <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>

              <Link
                href="/"
                onClick={handleNavLinkClick}
                className="text-xl font-bold text-white flex items-center"
                prefetch={false}
              >
                <Image
                  src="/images/final_logo.png"
                  alt="Hanstrix Technologies Logo"
                  width={200}
                  height={40}
                  className="object-contain pt-5"
                />
              </Link>

              <Link
                href="/"
                onClick={handleNavLinkClick}
                className={`text-lg ${isHomeActive ? 'text-cyan-400' : 'text-white hover:text-cyan-400'}`}
                aria-current={isHomeActive ? 'page' : undefined}
                prefetch={false}
              >
                Home
              </Link>

              <div className="flex flex-col space-y-2 w-full pt-2">
                <span className="text-white text-lg font-semibold border-b border-gray-700 pb-2">
                  Services
                </span>
                {serviceLinks.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    onClick={handleNavLinkClick}
                    className={`text-base pl-4 transition-colors ${
                      pathname === service.href
                        ? 'text-cyan-400'
                        : 'text-gray-300 hover:text-cyan-400'
                    }`}
                    aria-current={pathname === service.href ? 'page' : undefined}
                    prefetch={false}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>

              <Link
                href="/#about"
                onClick={handleNavLinkClick}
                className="text-lg text-white hover:text-cyan-400"
                prefetch={false}
              >
                About Us
              </Link>

              <Link
                href="/contact"
                onClick={handleNavLinkClick}
                className={`text-lg ${isContactActive ? 'text-cyan-400' : 'text-white hover:text-cyan-400'}`}
                aria-current={isContactActive ? 'page' : undefined}
                prefetch={false}
              >
                Contact
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
