import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";

const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  title,
  publishedAt,
  "imageUrl": mainImage.asset->url,
  body
}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await client.fetch(postQuery, { slug: resolvedParams.slug });
  
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.title,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await client.fetch(postQuery, { slug: resolvedParams.slug });

  if (!post) {
    notFound();
  }
  
  return (
    <article className="w-full max-w-3xl animate-fade-in flex flex-col gap-8 mx-auto mt-12 pb-20">
      <Link href="/blog" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors w-fit group">
        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
      </Link>
      
      <header className="flex flex-col gap-4 border-b border-white/10 pb-8">
        <div className="text-gray-500 flex items-center gap-2 font-mono text-sm">
          <CalendarBlank /> {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recently published'}
        </div>
         <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          {post.title}
         </h1>
      </header>

      {post.imageUrl && (
        <div className="w-full aspect-video rounded-3xl overflow-hidden glass border border-white/10 shadow-xl relative">
          <Image 
            src={post.imageUrl} 
            alt={post.title} 
            fill 
            priority
            className="object-cover" 
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      <div className="prose prose-invert prose-primary max-w-none prose-lg text-gray-300 leading-relaxed font-light">
        {post.body ? (
          <PortableText value={post.body} />
        ) : (
          <p className="italic opacity-50">No body text found for this article.</p>
        )}
      </div>
    </article>
  );
}
