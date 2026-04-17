import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Browser } from "@phosphor-icons/react/dist/ssr";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";

const projectQuery = `*[_type == "project" && slug.current == $slug][0] {
  title,
  description,
  link,
  tools,
  "imageUrl": image.asset->url,
  content
}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await client.fetch(projectQuery, { slug: resolvedParams.slug });
  
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description || "Detailed view of the project.",
  };
}

export default async function ProjectItem({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = await client.fetch(projectQuery, { slug: resolvedParams.slug });

  if (!project) {
    notFound();
  }
  
  return (
    <article className="w-full max-w-4xl animate-fade-in flex flex-col gap-10 mx-auto mt-12 pb-20">
      <Link href="/work" className="inline-flex items-center gap-2 text-secondary-400 hover:text-secondary-300 transition-colors w-fit group">
        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Work
      </Link>
      
      <header className="flex flex-col gap-6">
         <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          {project.title}
         </h1>
         <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
           {project.description}
         </p>
         
         {project.tools && project.tools.length > 0 && (
           <div className="flex flex-wrap gap-3">
              {project.tools.map((tool: string, i: number) => (
                <span key={i} className="px-4 py-2 rounded-full glass border border-white/10 text-sm font-bold shadow-lg text-secondary-200">
                  {tool}
                </span>
              ))}
           </div>
         )}

         {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 text-white bg-secondary/20 hover:bg-secondary/30 px-6 py-3 rounded-2xl w-fit transition-all glass border border-secondary/30 font-medium"
            >
              <Browser size={20} />
              Visit Live Project
            </a>
         )}
      </header>
      
      <div className="w-full aspect-video bg-white/5 rounded-[2.5rem] glass my-4 relative overflow-hidden border border-white/10 shadow-2xl">
          {project.imageUrl ? (
            <Image 
              src={project.imageUrl} 
              alt={project.title} 
              fill 
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Browser size={64} className="text-white/10" />
            </div>
          )}
      </div>

      <div className="prose prose-invert prose-secondary max-w-none text-gray-300 text-lg leading-loose font-light">
        {project.content ? (
          <PortableText value={project.content} />
        ) : (
          <p className="italic opacity-50">No detailed content matches found for this project yet.</p>
        )}
      </div>
    </article>
  );
}
