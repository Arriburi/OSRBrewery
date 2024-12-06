export type ArticleType = "Default" | "Spell" | "Monster" | "Adventure" | "Map" | "Magic Item" | "Encounter" | "Other"
export type KeyValue<K extends string = string, V = string | number> = {
  key: K;
  value: V;
}

export type BaseArticle<K extends string = string, V = string | number> = {
  id: string;
  title: string;
  text: string;
  tags: string[];
  type: ArticleType;
  imgSrc?: string;
  properties?: KeyValue<K, V>[];
  date: Date;
  author: string;
}
export const SpellKeys = ["Level", "Range", "Duration", "Area of Effect", "Components", "Casting Time", "Saving Throw"] as const;
type SpellKeysType = (typeof SpellKeys)[number];
export type SpellArticle = BaseArticle<SpellKeysType>;

export const MonsterKeys = [
  "Frequency", "No.Encountered", "Size", "Move",
  "Armour Class", "Hit Dice", "Attacks", "Damage",
  "Special Attacks", "Special Defences", "Magic Resistance",
  "Lair Probability", "Intelligence", "Alignment", "Level/XP"] as const;
type MonsterKeysType = (typeof MonsterKeys)[number];
export type MonsterArticle = BaseArticle<MonsterKeysType>;