import { Metadata } from "next";
import Image from "next/image";
import { CalendarBlank, Globe, Briefcase, GraduationCap, CodeBlock, FilePdf } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
const query = `*[_type == "profile"][0]{
  name,
  role,
  about,
  resumeUrl,
  "avatarUrl": avatar.asset->url,
  experiences
}`;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About | Samsul Anam - Portfolio",
  description: "About the creator details",
};

export default async function About() {
  const profile = await client.fetch(query);

  const name = profile?.name || "Your Name";
  const role = profile?.role || "Your Role";
  const avatarImage = profile?.avatarUrl || "/images/avatar.jpg";
  const resumeUrl = profile?.resumeUrl || "#";

  return (
    <div className="flex flex-col md:flex-row gap-12 w-full max-w-5xl animate-fade-in relative">
      {/* Sidebar / Avatar Area */}
      <aside className="w-full md:w-1/3 flex flex-col items-center md:items-start md:sticky top-40 h-fit gap-6 z-10">
        <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-[2rem] overflow-hidden glass border-white/10 shadow-xl">
          <Image 
            src={avatarImage} 
            alt={name} 
            fill 
            priority
            sizes="(max-width: 768px) 256px, 256px"
            className="object-cover"
          />
        </div>
        
        <div className="flex flex-col gap-3 w-full">
          {profile?.resumeUrl && (
            <a 
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl glass hover:bg-white/10 text-white font-medium transition-colors"
            >
              <FilePdf size={20} className="text-red-400" />
              Download Resume
            </a>
          )}
          
          <div className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 text-gray-400 flex items-center gap-3">
             <Globe weight="duotone" className="text-secondary-400" size={20}/>
             <span>Based globally (Remote)</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="w-full md:w-2/3 flex flex-col gap-16">
        
        {/* Intro */}
        <section className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold text-white mb-2">{name}</h1>
          <h2 className="text-2xl text-primary-300 mb-6">{role}</h2>
          
          <div className="prose prose-invert prose-lg prose-primary max-w-none text-gray-300 font-light leading-relaxed">
            {profile?.about ? (
              <PortableText value={profile.about} />
            ) : (
              <p>Your full about biography goes here. Waiting for Portable Text blocks from Sanity Studio.</p>
            )}
          </div>
        </section>

        {/* Work Experience */}
        {profile?.experiences && profile.experiences.length > 0 && (
          <section className="flex flex-col gap-8">
            <h3 className="text-3xl font-bold flex items-center gap-3 border-b border-white/10 pb-4 text-white">
              <Briefcase className="text-primary-400" weight="duotone" />
              Experience
            </h3>
            
            <div className="flex flex-col gap-8">
              {profile.experiences.map((exp: any, i: number) => (
                <div key={i} className="glass border-white/5 p-6 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-transparent" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <h4 className="text-xl font-bold text-white">{exp.company}</h4>
                    <span className="text-sm px-3 py-1 bg-white/10 rounded-full font-mono text-gray-300">{exp.timeframe}</span>
                  </div>
                  <h5 className="text-primary-300 mb-6 font-medium tracking-wide">{exp.role}</h5>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-3">
                      {exp.achievements.map((ach: string, j: number) => (
                        <li key={j} className="text-gray-400 flex items-start gap-3">
                          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary-500 mt-2" />
                          <span className="leading-relaxed">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}