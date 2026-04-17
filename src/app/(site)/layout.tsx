import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-animate min-h-screen relative flex flex-col w-full">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--primary), transparent 80%) 0%, transparent 50%)' }} />
      
      <Header />
      
      <main className="relative z-10 flex-grow flex flex-col items-center pt-32 pb-16 px-6 max-w-5xl mx-auto w-full min-h-screen">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
