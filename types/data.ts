export type ArticleType = "Default" | "Spell" | "Monster" | "Adventure" | "Map" | "Magic Item" | "Encounter" | "Other"
export type Properties = Record<MonsterKeysType | SpellKeysType, string | number>

export type BaseArticle = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  type: ArticleType;
  imgSrc?: string;
  properties?: Properties;
  date: Date;
  author: string;
}

export const SpellKeys = ["Level", "Range", "Duration", "Area of Effect", "Components", "Casting Time", "Saving Throw"] as const;
export type SpellKeysType = (typeof SpellKeys)[number];

export const MonsterKeys = [
  "Frequency", "# Encountered", "Size", "Move",
  "Armour Class", "Hit Dice", "Attacks", "Damage",
  "Special Attacks", "Special Defences", "Magic Resistance",
  "Lair Probability", "Intelligence", "Alignment", "Level/XP"] as const;
export type MonsterKeysType = (typeof MonsterKeys)[number];
