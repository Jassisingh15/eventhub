import React from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTicketAlt,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => (
  <footer className="relative z-10 mt-20 border-t border-[#397565]/20 bg-white/25 text-[#18352D] backdrop-blur-md">
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
      <div>
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-[#18352D]">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#397565] text-white">
            <FaTicketAlt />
          </span>
          Eventora
        </Link>

        <p className="mt-5 max-w-xs text-sm leading-6 text-[#18352D]/70">
          A thoughtful place to discover the experiences that bring people together.
        </p>
      </div>

      <div>
        <h4 className="text-sm font-extrabold text-[#18352D]">Navigation</h4>

        <div className="mt-5 space-y-3 text-sm font-medium text-[#18352D]/75">
          <Link to="/" className="block transition hover:text-[#397565]">Home</Link>
          <Link to="/#events" className="block transition hover:text-[#397565]">Events</Link>
          <Link to="/#categories" className="block transition hover:text-[#397565]">Categories</Link>
          <Link to="/#about" className="block transition hover:text-[#397565]">About</Link>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-extrabold text-[#18352D]">Support</h4>

        <div className="mt-5 space-y-3 text-sm font-medium text-[#18352D]/75">
          <Link to="/#faq" className="block transition hover:text-[#397565]">FAQs</Link>
          <a href="mailto:hello@eventora.com" className="block transition hover:text-[#397565]">Contact</a>
          <a href="mailto:hello@eventora.com?subject=Eventora%20Help" className="block transition hover:text-[#397565]">Help</a>
          <Link to="/dashboard" className="block transition hover:text-[#397565]">Bookings</Link>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-extrabold text-[#18352D]">Stay connected</h4>

        <div className="mt-5 space-y-3 text-sm font-medium text-[#18352D]/75">
          <a href="mailto:hello@eventora.com" className="flex items-center gap-3 transition hover:text-[#397565]">
            <FaEnvelope className="text-[#397565]" />
            hello@eventora.com
          </a>
          <a href="tel:+919876543210" className="flex items-center gap-3 transition hover:text-[#397565]">
            <FaPhoneAlt className="text-[#397565]" />
            +91 98765 43210
          </a>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <a
            href="https://www.linkedin.com/company/eventora/"
            target="_blank"
            rel="noreferrer"
            aria-label="Eventora on LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-full border border-[#397565]/30 text-[#18352D] transition hover:border-[#8A6A4A] hover:text-[#397565]"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.instagram.com/eventora/"
            target="_blank"
            rel="noreferrer"
            aria-label="Eventora on Instagram"
            className="grid h-9 w-9 place-items-center rounded-full border border-[#397565]/30 text-[#18352D] transition hover:border-[#8A6A4A] hover:text-[#397565]"
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            aria-label="Contact Eventora on WhatsApp"
            className="grid h-9 w-9 place-items-center rounded-full border border-[#397565]/30 text-[#18352D] transition hover:border-[#8A6A4A] hover:text-[#397565]"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>

    <div className="border-t border-[#397565]/20">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-xs font-medium text-[#18352D]/65 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Eventora. Made for moments that matter.</p>

        <div className="flex gap-5">
          <a href="/#privacy" className="transition hover:text-[#397565]">Privacy Policy</a>
          <a href="/#terms" className="transition hover:text-[#397565]">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
