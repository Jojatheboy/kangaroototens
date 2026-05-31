"use client";

import { motion } from "framer-motion";
import { whatsappUrl } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <motion.div
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-2"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Abinha que aparece no hover — UI Kangaroo */}
      <div
        aria-hidden="true"
        className="hidden sm:flex items-center gap-2 pr-1 origin-right opacity-0 -translate-x-2 scale-95 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100"
      >
        <div
          className="flex items-center gap-2.5 rounded-full"
          style={{
            background: "var(--c-surface)",
            border: "1px solid var(--c-line-strong)",
            padding: "8px 14px 8px 12px",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          }}
        >
          <span
            className="inline-flex items-center justify-center rounded-full"
            style={{
              width: 6,
              height: 6,
              background: "#25D366",
              boxShadow: "0 0 8px #25D366",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 12.5,
              letterSpacing: "-0.005em",
              color: "var(--c-text-primary)",
              whiteSpace: "nowrap",
            }}
          >
            Resposta em 2h
          </span>
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 10,
              color: "var(--c-text-mute)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            · chama aí
          </span>
        </div>
      </div>

      {/* Botão verde — sempre visível */}
      <motion.a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex items-center justify-center rounded-full no-underline shrink-0"
        style={{
          width: 56,
          height: 56,
          background: "#25D366",
          color: "#FFFFFF",
          boxShadow:
            "0 8px 24px rgba(37, 211, 102, 0.35), 0 0 0 4px rgba(37, 211, 102, 0.18)",
        }}
      >
        {/* Pulse ring decorativo */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{ border: "2px solid #25D366" }}
          animate={{ scale: [1, 1.35, 1.35], opacity: [0.6, 0, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <svg
          aria-hidden="true"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="relative"
        >
          <path d="M12.04 2.003c-5.523 0-10 4.477-10 10 0 1.763.46 3.484 1.336 5.005L2 22.003l5.13-1.345a9.96 9.96 0 0 0 4.91 1.286h.004c5.522 0 10-4.477 10-10s-4.478-9.941-10.004-9.941Zm0 18.16h-.004a8.16 8.16 0 0 1-4.155-1.137l-.298-.177-3.044.798.812-2.967-.194-.307a8.155 8.155 0 0 1-1.25-4.37c0-4.508 3.668-8.176 8.18-8.176 2.183 0 4.236.852 5.78 2.398a8.13 8.13 0 0 1 2.394 5.783c0 4.508-3.668 8.155-8.221 8.155Zm4.49-6.114c-.246-.123-1.456-.72-1.682-.802-.226-.082-.39-.123-.555.123s-.636.802-.78.967c-.144.164-.288.184-.534.061s-1.04-.383-1.98-1.223c-.732-.653-1.225-1.46-1.37-1.706-.144-.246-.015-.379.108-.502.111-.11.246-.288.37-.432.123-.144.164-.246.246-.41s.041-.308-.02-.432c-.062-.123-.555-1.337-.76-1.83-.2-.482-.405-.416-.555-.424l-.473-.008c-.164 0-.43.061-.656.308-.226.246-.862.842-.862 2.056s.883 2.385 1.006 2.55c.123.164 1.738 2.654 4.214 3.722.59.255 1.05.407 1.408.521.591.188 1.13.162 1.555.099.474-.071 1.456-.595 1.662-1.17.205-.575.205-1.068.143-1.17-.061-.103-.226-.165-.473-.288Z" />
        </svg>
      </motion.a>
    </motion.div>
  );
}
