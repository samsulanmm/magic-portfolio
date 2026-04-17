import { Metadata } from "next";
import { baseURL, blog } from "@/resources";
import Link from "next/link";
import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { client } from "@/sanity/lib/client";

export const revalidate = 3600;

const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  "excerpt": pt::text(body)[0...150] + "..."
}`;

const profileQuery = `*[_type == "profile"] | order(_updatedAt desc)[0]{ name }`;

export async function generateMetadata(): Promise<Metadata> {
  const profile = await client.fetch(profileQuery);
  const name = profile?.name || "Portfolio";
  return {
    title: `Blog | ${name}`,
    description: `Articles and insights written by ${name}`,
  };
}

export default async function Blog() {
  const [posts, profile] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(profileQuery)
  ]);
  const name = profile?.name || "the developer";

  return (
    <div className="w-full max-w-4xl animate-fade-in flex flex-col gap-12">
      <h1 className="text-5xl font-bold text-white tracking-tight border-b border-white/10 pb-6 uppercase">
        Articles by {name}
      </h1>
      
      <div className="flex flex-col gap-8">
        {posts && posts.length > 0 ? (
          posts.map((post: any) => (
            <Link href={`/blog/${post.slug}`} key={post._id} className="group relative">
               <div className="absolute -inset-4 bg-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
               <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="text-gray-500 flex items-center gap-2 font-mono text-sm shrink-0">
                    <CalendarBlank /> 
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <h2 className="text-2xl font-bold text-white group-hover:text-primary-300 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 line-clamp-2">
                      {post.excerpt || 'Read more about this topic...'}
                    </p>
                  </div>
               </div>
               <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mt-8" />
            </Link>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No blog posts published yet. Write your first post via /studio!</p>
          </div>
        )}
      </div>
    </div>
  );
}
