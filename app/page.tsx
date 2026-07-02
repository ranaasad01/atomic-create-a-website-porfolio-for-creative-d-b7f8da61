"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Star, Mail, MapPin, Check, ArrowUpRight } from 'lucide-react';
import { BRAND } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
  clipReveal,
} from "@/lib/motion";
import { useTranslations } from "next-intl";

// ── Inline data ───────────────────────────────────────────────────────────────

const projects = [
  {
    id: "1",
    title: "Forma Studio",
    category: "Brand Identity",
    year: "2024",
    image: "https://images.squarespace-cdn.com/content/v1/6345bd2f0fd48c37728b0819/88574f0e-8400-4ccc-bc5f-5ef18d2bd89b/Jess+Studio+Forma1639+1.jpg",
    accent: "#FF4D00",
    tags: ["Branding", "Typography", "Print"],
    description:
      "A complete visual identity for a Berlin-based architecture studio. Bold geometric forms meet restrained typography.",
  },
  {
    id: "2",
    title: "Pulse Health",
    category: "Digital Product",
    year: "2024",
    image: "https://media.licdn.com/dms/image/v2/C4E0BAQEQDeyNx5T0JA/company-logo_200_200/company-logo_200_200/0/1630605112070/intouchmd_logo?e=2147483647&v=beta&t=tfIrh5-Y80pxLHkqYzkm1u71HVeWT6woKEXafFdBT8g",
    accent: "#C8FF00",
    tags: ["UI/UX", "Mobile", "Design System"],
    description:
      "End-to-end product design for a wellness tracking app. Clean data visualisation with a human-first approach.",
  },
  {
    id: "3",
    title: "Noire Collective",
    category: "Art Direction",
    year: "2023",
    image: "https://noircollectiveavl.com/wp-content/uploads/2022/06/NoirLogo_cream.png",
    accent: "#FF4D00",
    tags: ["Art Direction", "Photography", "Editorial"],
    description:
      "Art direction for a luxury fashion collective's seasonal campaign. Dark, cinematic, and unapologetically bold.",
  },
  {
    id: "4",
    title: "Verdant Foods",
    category: "Packaging",
    year: "2023",
    image: "https://s3-media0.fl.yelpcdn.com/bphoto/yPW8sAR6yjQb-e-jxBdXZQ/348s.jpg",
    accent: "#C8FF00",
    tags: ["Packaging", "Illustration", "Branding"],
    description:
      "Sustainable packaging system for an organic food brand. Earthy tones, hand-drawn illustration, and zero visual noise.",
  },
];

const services = [
  {
    id: "s1",
    number: "01",
    title: "Brand Identity",
    description:
      "From naming and strategy to logo systems and brand guidelines. I build identities that hold up at every scale and every touchpoint.",
    deliverables: ["Logo & mark system", "Color & type palette", "Brand guidelines", "Stationery & print"],
  },
  {
    id: "s2",
    number: "02",
    title: "Digital Product Design",
    description:
      "UX research, wireframes, high-fidelity UI, and design systems. Products that feel intuitive the first time and every time after.",
    deliverables: ["UX research & flows", "Wireframes & prototypes", "High-fidelity UI", "Design system"],
  },
  {
    id: "s3",
    number: "03",
    title: "Art Direction",
    description:
      "Creative direction for campaigns, editorials, and content. I shape the visual language that makes a brand impossible to ignore.",
    deliverables: ["Campaign concepts", "Photography direction", "Editorial layout", "Social content"],
  },
  {
    id: "s4",
    number: "04",
    title: "Packaging & Print",
    description:
      "Tactile design that earns its place on the shelf. Structural thinking meets beautiful surface design for products worth picking up.",
    deliverables: ["Structural design", "Surface graphics", "Print production", "Retail display"],
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Jonas Richter",
    role: "Founder",
    company: "Forma Studio",
    quote:
      "Mara didn't just design our brand — she understood what we were trying to say before we could articulate it ourselves. The result is something we're proud to put on every wall.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Lena Park",
    role: "Head of Product",
    company: "Pulse Health",
    quote:
      "Working with Mara felt like having a co-founder who happened to be a world-class designer. She pushed back when we were wrong and delivered when it mattered.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Olivier Blanc",
    role: "Creative Director",
    company: "Noire Collective",
    quote:
      "The campaign she art-directed became our most-shared content ever. She has a rare ability to make something feel both timeless and completely of-the-moment.",
    rating: 5,
  },
];

const stats = [
  { value: "8+", label: "Years of practice" },
  { value: "120+", label: "Projects delivered" },
  { value: "40+", label: "Brands built" },
  { value: "3", label: "Continents served" },
];

// ── Reusable animated section wrapper ────────────────────────────────────────

function SectionReveal({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ── Contact form state type ───────────────────────────────────────────────────

type FormState = {
  name: string;
  email: string;
  project: string;
  message: string;
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    project: "Brand Identity",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const motionProps = shouldReduceMotion
    ? { initial: false, animate: false }
    : {};

  return (
    <main className="bg-[#0A0A0A] text-[#F5F5F5] overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-end px-6 md:px-10 pb-20 pt-32"
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% 30%, rgba(255,77,0,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.5) 39px, rgba(255,255,255,0.5) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.5) 39px, rgba(255,255,255,0.5) 40px)",
          }}
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Availability pill */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 mb-10 text-xs uppercase tracking-widest text-[#F5F5F5]/50"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] animate-pulse" />
            Available for new projects
          </motion.div>

          {/* Main headline */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              variants={clipReveal}
              initial="hidden"
              animate="visible"
              className="font-space text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-tight text-balance"
            >
              Design that
              <br />
              <span className="text-[#FF4D00]">refuses</span>
              <br />
              to blend in.
            </motion.h1>
          </div>

          {/* Sub row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-10"
          >
            <motion.p
              variants={fadeInUp}
              className="text-[#F5F5F5]/50 text-lg leading-relaxed max-w-md"
            >
              I'm {BRAND.name}, a creative designer based in {BRAND.location}.
              I craft brand identities, digital products, and visual systems for
              companies that want to be remembered.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <Link
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-3 bg-[#FF4D00] text-[#0A0A0A] font-bold uppercase tracking-wider text-sm px-7 py-4 hover:bg-[#C8FF00] transition-colors duration-300"
              >
                View Work
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
              <Link
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 border border-white/20 text-[#F5F5F5]/70 font-medium text-sm px-7 py-4 hover:border-white/50 hover:text-[#F5F5F5] transition-all duration-300"
              >
                Let's Talk
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-px border border-white/5 mt-20"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="bg-white/[0.02] px-6 py-6 border-r border-white/5 last:border-r-0"
              >
                <p className="font-space text-4xl font-bold text-[#FF4D00] mb-1">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-widest text-[#F5F5F5]/40">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WORK ─────────────────────────────────────────────────────────── */}
      <section id="work" className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <motion.p
                variants={fadeInUp}
                className="text-xs uppercase tracking-widest text-[#FF4D00] mb-3"
              >
                Selected Work
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-space text-5xl md:text-6xl font-bold tracking-tight"
              >
                Projects that
                <br />
                made a mark.
              </motion.h2>
            </div>
            <motion.p
              variants={fadeInUp}
              className="text-[#F5F5F5]/50 max-w-xs leading-relaxed text-sm"
            >
              A curated selection of brand, product, and campaign work from the
              past few years.
            </motion.p>
          </motion.div>

          {/* Project grid — asymmetric bento */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5"
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                variants={scaleIn}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className={`group relative bg-[#0A0A0A] overflow-hidden cursor-pointer ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    i === 0 ? "h-[55vw] max-h-[600px]" : "h-72 md:h-80"
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(project.tags ?? []).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-widest border border-white/20 px-2 py-1 text-[#F5F5F5]/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-space text-2xl md:text-3xl font-bold mb-1">
                        {project.title}
                      </h3>
                      <p className="text-[#F5F5F5]/50 text-sm">
                        {project.category} — {project.year}
                      </p>
                    </div>
                    <div
                      className="w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: project.accent }}
                    >
                      <ArrowUpRight size={18} className="text-[#0A0A0A]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-24 md:py-32 px-6 md:px-10 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative overflow-hidden aspect-[3/4] max-w-sm">
                <img
                  src="https://kbfvmwndlaaedjekzibh.supabase.co/storage/v1/object/public/artwork-images/7ffeeb78-f635-42b9-ad48-1ee82011fda2/1777833072330-zid6x.webp"
                  alt="Mara Voss, Creative Designer"
                  className="w-full h-full object-cover"
                />
                {/* Accent border */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#FF4D00]/30 pointer-events-none" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-6 right-0 md:-right-8 bg-[#C8FF00] text-[#0A0A0A] px-5 py-4"
              >
                <p className="font-space font-bold text-2xl leading-none">8+</p>
                <p className="text-xs uppercase tracking-widest font-bold mt-1">
                  Years
                </p>
              </motion.div>
            </motion.div>

            {/* Text side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p
                variants={fadeInUp}
                className="text-xs uppercase tracking-widest text-[#FF4D00] mb-4"
              >
                About Me
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-space text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance"
              >
                Obsessed with craft. Driven by ideas.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[#F5F5F5]/60 leading-relaxed mb-4"
              >
                I'm a Berlin-based creative designer with over eight years of
                experience working with startups, agencies, and global brands.
                My practice spans brand identity, digital product design, and
                art direction — always with the same goal: make something worth
                looking at.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-[#F5F5F5]/60 leading-relaxed mb-8"
              >
                Before going independent, I led design at two venture-backed
                startups and spent three years at a top-tier branding agency in
                Amsterdam. Today I work directly with founders, marketing teams,
                and creative directors who want design that actually moves the
                needle.
              </motion.p>

              {/* Skills */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 gap-3"
              >
                {[
                  "Brand Strategy",
                  "Visual Identity",
                  "UI/UX Design",
                  "Art Direction",
                  "Design Systems",
                  "Packaging",
                ].map((skill) => (
                  <motion.div
                    key={skill}
                    variants={fadeInUp}
                    className="flex items-center gap-2 text-sm text-[#F5F5F5]/70"
                  >
                    <Check size={14} className="text-[#C8FF00] shrink-0" />
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section
        id="services"
        className="py-24 md:py-32 px-6 md:px-10 bg-[#0F0F0F] border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs uppercase tracking-widest text-[#FF4D00] mb-3"
            >
              Services
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-space text-5xl md:text-6xl font-bold tracking-tight max-w-xl text-balance"
            >
              What I bring to the table.
            </motion.h2>
          </motion.div>

          {/* Services list */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="divide-y divide-white/5"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.25 }}
                className="group grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-6 py-10 cursor-default"
              >
                <p className="font-space text-xs text-[#FF4D00] font-bold tracking-widest pt-1">
                  {service.number}
                </p>
                <div>
                  <h3 className="font-space text-2xl font-bold mb-3 group-hover:text-[#FF4D00] transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-[#F5F5F5]/50 leading-relaxed text-sm max-w-sm">
                    {service.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 md:justify-end content-start">
                  {(service.deliverables ?? []).map((d) => (
                    <span
                      key={d}
                      className="text-[10px] uppercase tracking-widest border border-white/10 px-3 py-1.5 text-[#F5F5F5]/40 group-hover:border-[#FF4D00]/30 group-hover:text-[#F5F5F5]/60 transition-all duration-200"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs uppercase tracking-widest text-[#FF4D00] mb-3"
            >
              Kind Words
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-space text-5xl md:text-6xl font-bold tracking-tight"
            >
              What clients say.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={scaleIn}
                className="bg-[#0A0A0A] p-8 flex flex-col justify-between gap-8"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star
                      key={si}
                      size={14}
                      className="fill-[#FF4D00] text-[#FF4D00]"
                    />
                  ))}
                </div>

                <blockquote className="text-[#F5F5F5]/80 leading-relaxed text-sm flex-1">
                  "{t.quote}"
                </blockquote>

                <div className="border-t border-white/5 pt-6">
                  <p className="font-space font-bold text-sm">{t.name}</p>
                  <p className="text-[#F5F5F5]/40 text-xs mt-0.5">
                    {t.role}, {t.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────────────────── */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-24 md:py-32 px-6 md:px-10 bg-[#FF4D00]"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <h2 className="font-space text-4xl md:text-6xl font-bold tracking-tight text-[#0A0A0A] text-balance max-w-xl">
            Ready to build something worth remembering?
          </h2>
          <Link
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group shrink-0 inline-flex items-center gap-3 bg-[#0A0A0A] text-[#F5F5F5] font-bold uppercase tracking-wider text-sm px-8 py-5 hover:bg-[#C8FF00] hover:text-[#0A0A0A] transition-colors duration-300"
          >
            Start a Project
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>
      </motion.section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-24 md:py-32 px-6 md:px-10 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Left */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="text-xs uppercase tracking-widest text-[#FF4D00] mb-4">
                Contact
              </p>
              <h2 className="font-space text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
                Let's make something great.
              </h2>
              <p className="text-[#F5F5F5]/50 leading-relaxed mb-10 max-w-sm">
                I'm currently taking on new projects for Q3 2024. Tell me about
                what you're building and let's see if we're a good fit.
              </p>

              <div className="flex flex-col gap-4">
                <a
                  href={`mailto:${BRAND.email}`}
                  className="inline-flex items-center gap-3 text-[#F5F5F5]/70 hover:text-[#FF4D00] transition-colors duration-200 text-sm"
                >
                  <Mail size={16} />
                  {BRAND.email}
                </a>
                <div className="inline-flex items-center gap-3 text-[#F5F5F5]/70 text-sm">
                  <MapPin size={16} />
                  {BRAND.location}
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {submitted ? (
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-start justify-center h-full gap-4 py-16"
                >
                  <div className="w-12 h-12 bg-[#C8FF00] flex items-center justify-center">
                    <Check size={22} className="text-[#0A0A0A]" />
                  </div>
                  <h3 className="font-space text-2xl font-bold">
                    Message received.
                  </h3>
                  <p className="text-[#F5F5F5]/50 text-sm leading-relaxed">
                    Thanks for reaching out. I'll get back to you within 48
                    hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#F5F5F5]/40">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#F5F5F5]/20 focus:outline-none focus:border-[#FF4D00]/60 transition-colors duration-200"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#F5F5F5]/40">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#F5F5F5]/20 focus:outline-none focus:border-[#FF4D00]/60 transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#F5F5F5]/40">
                      Project Type
                    </label>
                    <select
                      name="project"
                      value={form.project}
                      onChange={handleChange}
                      className="bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-[#F5F5F5] focus:outline-none focus:border-[#FF4D00]/60 transition-colors duration-200 appearance-none"
                    >
                      <option value="Brand Identity">Brand Identity</option>
                      <option value="Digital Product">Digital Product</option>
                      <option value="Art Direction">Art Direction</option>
                      <option value="Packaging">Packaging</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#F5F5F5]/40">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#F5F5F5]/20 focus:outline-none focus:border-[#FF4D00]/60 transition-colors duration-200 resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="bg-[#FF4D00] text-[#0A0A0A] font-bold uppercase tracking-wider text-sm px-8 py-4 hover:bg-[#C8FF00] transition-colors duration-300 self-start"
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}