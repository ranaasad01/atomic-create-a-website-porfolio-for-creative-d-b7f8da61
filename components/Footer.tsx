"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks, BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail } from 'lucide-react';
import { useTranslations } from "next-intl";

const socials = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Mail, label: "Email", href: `mailto:${BRAND.email}` },
];

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function getHref(href: string) {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  }

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 pt-20 pb-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <p className="font-space font-bold text-3xl tracking-tight text-[#F5F5F5] mb-3">
              {BRAND.name}
              <span className="text-[#FF4D00]">.</span>
            </p>
            <p className="text-[#F5F5F5]/50 text-sm leading-relaxed max-w-xs">
              Crafting bold visual identities and digital experiences that refuse
              to blend in. Based in {BRAND.location}.
            </p>
          </motion.div>

          {/* Nav column */}
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF4D00] mb-5">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-[#F5F5F5]/60 hover:text-[#F5F5F5] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact column */}
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF4D00] mb-5">
              Get in Touch
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="text-[#F5F5F5]/60 hover:text-[#F5F5F5] text-sm transition-colors duration-200 block mb-6"
            >
              {BRAND.email}
            </a>
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-[#F5F5F5]/50 hover:text-[#FF4D00] hover:border-[#FF4D00]/40 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#F5F5F5]/30 text-xs">
            &copy; 2024 {BRAND.name}. All rights reserved.
          </p>
          <p className="text-[#F5F5F5]/20 text-xs">
            Designed with intention. Built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}