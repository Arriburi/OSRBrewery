import { ArticleType } from "@/types/data";
import { STORAGE_CONFIG } from "./storage";
import { supabaseAdmin } from "./supabase";

export const default_images: Record<ArticleType, string> = {
  "Default": "/default/default-article.svg",
  "Spell": "/default/default-spell.svg",
  "Monster": "/default/default-monster.svg",
  "Adventure": "/default/default-adventure.svg",
  "Map": "/default/default-map.svg",
  "Magic Item": "/default/default-magic-item.svg",
  "Encounter": "/default/default-encounter.svg",
  "Other": "/default/default-other.svg"
};

export function getImageSrc(imgSrc: string | null, type: ArticleType): string | null {
  if (!imgSrc) return default_images[type];

  // If it's a default image, return it as is
  if (imgSrc.startsWith('/default/')) return imgSrc;

  // For Supabase storage images, construct the full URL
  const { data: { publicUrl } } = supabaseAdmin.storage
    .from(STORAGE_CONFIG.BUCKET_NAME)
    .getPublicUrl(imgSrc);
  console.log("BUCKET_NAME", STORAGE_CONFIG.BUCKET_NAME);

  return publicUrl;
} 