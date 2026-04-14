import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Blog Post: ${resolvedParams.slug}`,
    description: "Read this fascinating blog post rendered with Sanity and Tailwind.",
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  
  // Provide a placeholder while Sanity CMS data is empty.
  return (
    <article className="w-full max-w-3xl animate-fade-in flex flex-col gap-8 mx-auto mt-12">
      <Link href="/blog" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors w-fit group">
        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
      </Link>
      
      <header className="flex flex-col gap-4 border-b border-white/10 pb-8">
        <div className="text-gray-500 flex items-center gap-2 font-mono text-sm">
          <CalendarBlank /> Published recently
        </div>
         <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          {resolvedParams.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
         </h1>
      </header>

      <div className="prose prose-invert prose-primary max-w-none prose-lg text-gray-300">
        <p>This is a placeholder page for the blog post <strong>{resolvedParams.slug}</strong>.</p>
        <p>Since the application has been successfully migrated to use <strong>Sanity CMS</strong>, you will need to add content blocks via <Link href="/studio" className="text-primary-400 underline">Sanity Studio</Link> and update the Next-Sanity fetcher to render Portable Text here.</p>
        <div className="w-full h-64 bg-white/5 rounded-2xl glass mt-8 flex flex-col items-center justify-center text-gray-500">
           Content from CMS will appear here
        </div>
      </div>
    </article>
  );
}
