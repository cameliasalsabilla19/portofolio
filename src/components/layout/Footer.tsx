import Link from "next/link";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const socials = [
  {
    href: "https://www.linkedin.com/in/camelia-salsabilla-842a69219",
    label: "LinkedIn",
    icon: FaLinkedinIn,
  },
  {
    href: "https://wa.me/6281327425528",
    label: "WhatsApp",
    icon: FaWhatsapp,
  },
  {
    href: "mailto:cameliasalsabilla19@gmail.com",
    label: "Email",
    icon: MdEmail,
  },
];

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link href="#home" className="text-lg font-bold gradient-text">
          Camelia
        </Link>

        {/* Nav */}
        <ul className="flex flex-wrap items-center gap-6">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-white/50 hover:text-white/90 transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-full flex items-center justify-center
                border border-white/10 text-white/50 text-base
                hover:text-[#EB8DB5] hover:border-[#EB8DB5]
                transition-all duration-200"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <div className="text-center py-4 border-t border-white/5 text-xs text-white/30">
        © {year} Camelia. All rights reserved.
      </div>
    </footer>
  );
}
