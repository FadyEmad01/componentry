"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { LandingContent } from "@/components/landing/landing-frame";

const emailAddress = "harshjadhavconnect@gmail.com";

const XIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function CustomWorkCta() {
  return (
    <LandingContent>
      <motion.section
        initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        className="relative overflow-hidden py-16 sm:py-20"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#071833] px-5 py-12 text-center shadow-[0_18px_64px_rgba(7,24,51,0.22),inset_0_1px_0_rgba(255,255,255,0.10)] sm:px-8 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_14%,rgba(246,252,255,0.36)_0%,rgba(141,169,204,0.18)_18%,rgba(141,169,204,0)_38%),radial-gradient(circle_at_78%_90%,rgba(67,118,178,0.32)_0%,rgba(25,71,130,0.22)_26%,rgba(25,71,130,0)_50%),linear-gradient(125deg,#071833_0%,#0b376e_55%,#356faa_84%,#789dc8_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(3,6,17,0.70),transparent_44%),radial-gradient(circle_at_48%_58%,rgba(3,6,17,0.38),transparent_36%),linear-gradient(90deg,rgba(3,6,17,0.38),transparent_72%)]" />
          <div className="absolute inset-0 opacity-[0.065] [background-image:radial-gradient(rgba(255,255,255,0.62)_1px,transparent_1px)] [background-size:8px_8px] [mask-image:radial-gradient(ellipse_at_center,black_18%,transparent_74%)]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(ellipse_at_bottom,rgba(246,252,255,0.12),transparent_64%)]" />

          <div className="relative mx-auto max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/58">
              Custom design work
            </p>
            <h2 className="text-3xl font-semibold leading-[1] tracking-[-0.035em] text-white text-balance sm:text-4xl md:text-5xl">
              Need something custom?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/64 text-pretty sm:text-base sm:leading-7">
              Landing pages, tailored UI, and interactive product sections with
              the same motion-first polish behind Componentry.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${emailAddress}?subject=Custom%20design%20work`}
                className="group inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-white/95 px-4 text-sm font-medium text-[#071833] shadow-[0_1px_1px_rgba(3,6,17,0.10),0_10px_24px_rgba(3,6,17,0.14)] transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white hover:shadow-[0_1px_1px_rgba(3,6,17,0.12),0_14px_30px_rgba(3,6,17,0.18)] active:scale-[0.96] sm:w-auto"
              >
                <Mail className="size-4" />
                {emailAddress}
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://x.com/harshjdhv"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.065] px-4 text-sm font-medium text-white/92 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-md transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white/20 hover:bg-white/[0.10] active:scale-[0.96] sm:w-auto"
              >
                <XIcon />
                DM @harshjdhv
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </LandingContent>
  );
}
