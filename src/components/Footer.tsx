import { client } from "@/sanity/lib/client";
import { person } from "@/resources";
import Link from "next/link";
import { 
  EnvelopeSimple, 
  GithubLogo, 
  LinkedinLogo, 
  TwitterLogo, 
  InstagramLogo, 
  WhatsappLogo, 
  YoutubeLogo, 
  TiktokLogo, 
  FacebookLogo, 
  Globe 
} from "@phosphor-icons/react/dist/ssr";

const profileQuery = `*[_type == "profile"] | order(_updatedAt desc)[0]{ 
  name,
  socialLinks
}`;

const iconMap: Record<string, any> = {
  github: GithubLogo,
  linkedin: LinkedinLogo,
  twitter: TwitterLogo,
  instagram: InstagramLogo,
  whatsapp: WhatsappLogo,
  email: EnvelopeSimple,
  youtube: YoutubeLogo,
  tiktok: TiktokLogo,
  facebook: FacebookLogo,
  website: Globe,
};

export async function Footer() {
  const profile = await client.fetch(profileQuery);
  const name = profile?.name || person.name || "Portfolio";
  const socialLinks = profile?.socialLinks || [];

  return (
    <footer className="w-full max-w-4xl mx-auto py-12 px-6 mt-20 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </div>
        
        <div className="flex items-center gap-4">
          {socialLinks.length > 0 ? (
            socialLinks.map((link: any, index: number) => {
              const Icon = iconMap[link.platform] || Globe;
              return (
                <Link 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 glass rounded-full text-gray-400 hover:text-white transition-colors hover:scale-110"
                >
                  <Icon size={20} />
                </Link>
              );
            })
          ) : (
            <>
              <Link href="https://github.com" target="_blank" className="p-2 glass rounded-full text-gray-400 hover:text-white transition-colors hover:scale-110">
                <GithubLogo size={20} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="p-2 glass rounded-full text-gray-400 hover:text-white transition-colors hover:scale-110">
                <LinkedinLogo size={20} />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="p-2 glass rounded-full text-gray-400 hover:text-white transition-colors hover:scale-110">
                <TwitterLogo size={20} />
              </Link>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
