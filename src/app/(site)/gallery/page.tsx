import { Metadata } from "next";
import { gallery } from "@/resources";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

export const revalidate = 3600;

const galleryQuery = `*[_type == "gallery"] | order(date desc) {
  _id,
  title,
  "imageUrl": image.asset->url
}`;

export const metadata: Metadata = {
  title: gallery.title,
  description: gallery.description,
};

export default async function Gallery() {
  const images = await client.fetch(galleryQuery);

  return (
    <div className="w-full max-w-6xl animate-fade-in flex flex-col gap-12">
      <h1 className="text-5xl font-bold text-white tracking-tight border-b border-white/10 pb-6 text-center">
        {gallery.title}
      </h1>
      
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        {images && images.length > 0 ? (
          images.map((img: any, i: number) => (
            <div key={img._id} className="break-inside-avoid relative group rounded-2xl overflow-hidden glass border-white/10 shadow-lg group-hover:shadow-2xl transition-all duration-500">
               {img.imageUrl ? (
                 <div className="relative w-full aspect-[3/4]">
                   <Image src={img.imageUrl} alt={img.title || `Capture`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                 </div>
               ) : (
                 <div className={`w-full bg-white/5 ${i % 2 === 0 ? 'h-64' : 'h-96'}`}></div>
               )}
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-md">
                    {img.title || `Capture`}
                  </span>
               </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500 w-full inline-block">
            <p>No gallery images found. Upload photos via /studio!</p>
          </div>
        )}
      </div>
    </div>
  );
}
