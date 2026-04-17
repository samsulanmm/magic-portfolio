import { Metadata } from "next";
import { baseURL, work } from "@/resources";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { client } from "@/sanity/lib/client";

export const revalidate = 3600;

const projectsQuery = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  tools,
  "imageUrl": image.asset->url
}`;

const profileQuery = `*[_type == "profile"] | order(_updatedAt desc)[0]{ name }`;

export async function generateMetadata(): Promise<Metadata> {
  const profile = await client.fetch(profileQuery);
  const name = profile?.name || "Portfolio";
  return {
    title: `Work | ${name}`,
    description: `A collection of projects and case studies by ${name}`,
  };
}

export default async function Work() {
  const [projects, profile] = await Promise.all([
    client.fetch(projectsQuery),
    client.fetch(profileQuery)
  ]);
  const name = profile?.name || "the developer";

  return (
    <div className="w-full max-w-5xl animate-fade-in flex flex-col gap-12">
      <h1 className="text-5xl font-bold text-white tracking-tight border-b border-white/10 pb-6 uppercase">
        Projects by {name}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects && projects.length > 0 ? (
          projects.map((project: any) => (
            <Link href={`/work/${project.slug}`} key={project._id} className="group flex flex-col gap-4">
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass border-white/10 group-hover:-translate-y-2 group-hover:scale-[1.02] transition-all duration-500 shadow-2xl bg-white/5 border border-white/5">
                 <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                 {project.imageUrl ? (
                   <Image src={project.imageUrl} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                 ) : (
                   <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-mono text-sm">
                      No Preview Image
                   </div>
                 )}
              </div>
              
              <div className="flex flex-col gap-2 px-2">
                <h2 className="text-2xl font-bold text-white group-hover:text-primary-300 transition-colors flex items-center gap-2">
                  {project.title}
                  <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                </h2>
                <p className="text-gray-400 line-clamp-2">
                  {project.description}
                </p>
                {project.tools && project.tools.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-xs font-mono mt-2">
                    {project.tools.map((tool: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-white/10 text-white/70">{tool}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p>No projects found. Publish your first project via /studio!</p>
          </div>
        )}
      </div>
    </div>
  );
}
