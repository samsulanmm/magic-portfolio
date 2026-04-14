import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Samsul Anam - Magic Portfolio",
  description: "A premium software engineering portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="text-foreground antialiased selection:bg-primary/30 min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}
