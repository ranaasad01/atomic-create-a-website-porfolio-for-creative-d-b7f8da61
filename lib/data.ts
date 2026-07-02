export type NavLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  accent: string;
  tags: string[];
  description: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
};

// ── Brand constants ──────────────────────────────────────────────────────────
export const BRAND = {
  name: "Mara Voss",
  tagline: "Creative Designer",
  email: "hello@maravoss.com",
  location: "Berlin, Germany",
  accentOrange: "#FF4D00",
  accentLime: "#C8FF00",
} as const;

// ── Navigation (single source of truth) ─────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const navCTA = {
  label: "Let's Talk",
  href: "#contact",
};