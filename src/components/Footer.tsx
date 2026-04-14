"use client";

import { EnvelopeSimple, GithubLogo, LinkedinLogo, TwitterLogo } from "@phosphor-icons/react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full max-w-4xl mx-auto py-12 px-6 mt-20 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} Samsul Anam. All rights reserved.
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="https://github.com" target="_blank" className="p-2 glass rounded-full text-gray-400 hover:text-white transition-colors hover:scale-110">
            <GithubLogo size={20} />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="p-2 glass rounded-full text-gray-400 hover:text-white transition-colors hover:scale-110">
            <LinkedinLogo size={20} />
          </Link>
          <Link href="https://twitter.com" target="_blank" className="p-2 glass rounded-full text-gray-400 hover:text-white transition-colors hover:scale-110">
            <TwitterLogo size={20} />
          </Link>
          <a href="mailto:contact@example.com" className="p-2 glass rounded-full text-gray-400 hover:text-white transition-colors hover:scale-110">
            <EnvelopeSimple size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
