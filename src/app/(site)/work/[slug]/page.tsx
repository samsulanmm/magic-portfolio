import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Browser } from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Project: ${resolvedParams.slug}`,
    description: "Detailed view of the project and technical stack.",
  };
}

export default async function ProjectItem({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  
  // Placeholder while Sanity CMS data is empty.
  return (
    <article className="w-full max-w-4xl animate-fade-in flex flex-col gap-10 mx-auto mt-12">
      <Link href="/work" className="inline-flex items-center gap-2 text-secondary-400 hover:text-secondary-300 transition-colors w-fit group">
        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Work
      </Link>
      
      <header className="flex flex-col gap-6">
         <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          {resolvedParams.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
         </h1>
         <p className="text-xl text-gray-400 max-w-2xl">
           A detailed dive into the architecture and design of this specific project.
           Currently managed dynamically via Sanity CMS.
         </p>
         <div className="flex flex-wrap gap-3">
             <span className="px-4 py-2 rounded-full glass border border-white/10 text-sm font-bold shadow-lg">Next.js</span>
             <span className="px-4 py-2 rounded-full glass border border-white/10 text-sm font-bold shadow-lg">Tailwind CSS</span>
             <span className="px-4 py-2 rounded-full glass border border-white/10 text-sm font-bold shadow-lg">Sanity CMS</span>
         </div>
      </header>
      
      <div className="w-full aspect-video bg-white/5 rounded-3xl glass my-4 relative overflow-hidden flex items-center justify-center">
          <Browser size={64} className="text-white/20" />
      </div>

      <div className="prose prose-invert prose-secondary max-w-none text-gray-300 text-lg">
        <h3>Project Overview</h3>
        <p>This is a placeholder page for the project details.</p>
        <p>Head over to <Link href="/studio" className="text-secondary-400 underline">Sanity Studio</Link> to author your rich block content and feature imagery to make this page pop!</p>
      </div>
    </article>
  );
}
