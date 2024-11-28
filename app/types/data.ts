export type ArticleType = "Spell" | "Monster" | "Adventure" | "Map" | "Magic Item"
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
export const SpellKeys = ["Level", "Range", "Duration"] as const;
type SpellKeysType = (typeof SpellKeys)[number];
export type SpellArticle = BaseArticle<SpellKeysType>;

export const MonsterKeys = ["Armour Class", "Hit Dice", "Attacks"] as const;
type MonsterKeysType = (typeof MonsterKeys)[number];
export type MonsterArticle = BaseArticle<MonsterKeysType>;