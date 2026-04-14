"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { House, User, Code, Notebook, Camera } from "@phosphor-icons/react";

const navItems = [
  { path: "/", label: "Home", icon: House },
  { path: "/about", label: "About", icon: User },
  { path: "/work", label: "Work", icon: Code },
  { path: "/blog", label: "Blog", icon: Notebook },
  { path: "/gallery", label: "Gallery", icon: Camera },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
      <nav className="glass px-2 py-2 rounded-full flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-1 w-full justify-center">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/" && pathname?.startsWith(item.path));
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 ease-out group ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="header-active"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <Icon weight={isActive ? "fill" : "regular"} className="text-xl group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline-block relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
