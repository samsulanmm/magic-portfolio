import "./globals.css";
import { Inter, Roboto_Mono, Playfair_Display, Outfit } from "next/font/google";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";

// Pre-load all available fonts (Vercel caches these efficiently)
const inter = Inter({ subsets: ["latin"], display: 'swap', variable: "--font-primary" });
const roboto = Roboto_Mono({ subsets: ["latin"], display: 'swap', variable: "--font-primary" });
const playfair = Playfair_Display({ subsets: ["latin"], display: 'swap', variable: "--font-primary" });
const outfit = Outfit({ subsets: ["latin"], display: 'swap', variable: "--font-primary" });

export const metadata: Metadata = {
  title: "Samsul Anam - Portfolio",
  description: "A software engineer portfolio website.",
};

export const revalidate = 3600; // Cache for 1 hour, use On-Demand Revalidation (Webhook) for instant updates

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch Theme settings from Sanity singleton
  const themeQuery = `*[_type == "themeSettings"][0]`;
  const theme = await client.fetch(themeQuery);

  let fontClass = inter.variable; // Default fallback
  if (theme?.fontFamily === 'Roboto Mono') fontClass = roboto.variable;
  if (theme?.fontFamily === 'Playfair Display') fontClass = playfair.variable;
  if (theme?.fontFamily === 'Outfit') fontClass = outfit.variable;

  // Set CSS Variables natively (Tailwind will use these)
  const styleVariables = {
    '--background': theme?.backgroundColor || '#0f172a',
    '--foreground': theme?.foregroundColor || '#f8fafc',
    '--primary': theme?.primaryColor || '#8b5cf6',
    '--secondary': theme?.secondaryColor || '#3b82f6',
  } as React.CSSProperties;

  return (
    <html lang="en" className={fontClass} style={styleVariables} suppressHydrationWarning>
      <body className="text-foreground antialiased selection:bg-primary/30 min-h-screen bg-background" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
