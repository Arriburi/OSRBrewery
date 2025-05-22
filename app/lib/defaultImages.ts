import { ArticleType } from "@/types/data";

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
  return imgSrc ? `/upload/${imgSrc}` : default_images[type];
} 