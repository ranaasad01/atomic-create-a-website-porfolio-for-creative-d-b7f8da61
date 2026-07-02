"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, navCTA, BRAND } from "@/lib/data";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    } else {
      setMenuOpen(false);
    }
  }

  function getHref(href: string) {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-space font-bold text-lg tracking-tight text-[#F5F5F5] hover:text-[#FF4D00] transition-colors duration-200"
          >
            {BRAND.name}
            <span className="text-[#FF4D00]">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={getHref(link.href)}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-sm font-medium text-[#F5F5F5]/60 hover:text-[#F5F5F5] transition-colors duration-200 tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={getHref(navCTA.href)}
              onClick={(e) => handleAnchorClick(e, navCTA.href)}
              className="px-5 py-2.5 bg-[#FF4D00] text-[#0A0A0A] text-sm font-bold uppercase tracking-wider rounded-none hover:bg-[#C8FF00] transition-colors duration-200"
            >
              {navCTA.label}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-6 h-0.5 bg-[#F5F5F5] origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-0.5 bg-[#F5F5F5]"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-6 h-0.5 bg-[#F5F5F5] origin-center"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col justify-center px-10"
          >
            <nav className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-4xl font-space font-bold text-[#F5F5F5] hover:text-[#FF4D00] transition-colors duration-200 tracking-tight"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={getHref(navCTA.href)}
                onClick={(e) => handleAnchorClick(e, navCTA.href)}
                className="mt-4 inline-block px-8 py-4 bg-[#FF4D00] text-[#0A0A0A] text-xl font-bold uppercase tracking-wider w-fit"
              >
                {navCTA.label}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}