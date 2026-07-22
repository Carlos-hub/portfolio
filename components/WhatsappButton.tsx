"use client";

import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/whatsapp";

export default function WhatsappButton({
  label,
  message,
  className = "",
}: {
  label: string;
  message: string;
  className?: string;
}) {
  return (
    <motion.a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-lg font-bold text-black shadow-[0_0_30px_-5px_var(--accent)] transition-shadow hover:shadow-[0_0_45px_0_var(--accent)] ${className}`}
    >
      {label}
    </motion.a>
  );
}
