import { ArrowRight, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

// Define the GROQ queries
const query = `*[_type == "profile"][0]{
  name,
  role,
  bio,
  "avatarUrl": avatar.asset->url
}`;

const projectsQuery = `*[_type == "project"][0...4] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  tools,
  "imageUrl": image.asset->url
}`;

export const revalidate = 3600;

export default async function Home() {
  // Fetch data natively on the server side
  const [profile, projects] = await Promise.all([
    client.fetch(query),
    client.fetch(projectsQuery)
  ]);

  // Fallbacks in case user hasn't hit publish perfectly
  const name = profile?.name || "Your Name";
  const role = profile?.role || "Your Tagline / Profession";
  const bio = profile?.bio || "A brief introduction about your skills and workflow.";
  const avatarImage = profile?.avatarUrl || "/images/avatar.jpg";

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full text-center gap-8 animate-slide-up">
      <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white/10 shadow-2xl glass">
        <Image 
          src={avatarImage} 
          alt={name} 
          fill 
          priority
          sizes="(max-width: 768px) 128px, 128px"
          className="object-cover" 
        />
      </div>
      
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-primary/30 text-primary-200 text-sm font-medium mb-4">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for new opportunities
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2">
          Hi, I'm <br className="md:hidden" />
          <span className="text-gradient leading-tight">{name}</span>
        </h1>
        <h2 className="text-2xl font-medium text-white/80">
          {role}
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl mx-auto font-light mt-4">
          {bio}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
        <Link 
          href="/work" 
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]"
        >
          View My Work
          <ArrowRight weight="bold" />
        </Link>
        <a 
          href="mailto:contact@example.com" 
          className="w-full sm:w-auto px-8 py-4 rounded-full glass text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all sm:hover:scale-105"
        >
          Contact Me
          <EnvelopeSimple weight="bold" />
        </a>
      </div>
      
      <div className="mt-32 w-full text-left">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {projects && projects.length > 0 ? (
            projects.map((project: any) => (
              <Link href={`/work/${project.slug}`} key={project._id} className="glass-card p-6 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group cursor-pointer block">
                <div className="w-full h-48 bg-white/5 rounded-2xl mb-6 overflow-hidden relative border border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"/>
                  {project.imageUrl ? (
                    <Image src={project.imageUrl} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-mono text-sm">No Preview</div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-300 transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                {project.tools && project.tools.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-xs">
                    {project.tools.map((tool: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-white/10 font-mono text-white/70">{tool}</span>
                    ))}
                  </div>
                )}
              </Link>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              <p>No featured projects yet. Configure them in your Sanity Studio at /studio.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
