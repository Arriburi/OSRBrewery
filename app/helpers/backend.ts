import { BaseArticle, SpellArticle } from "../types/data";

export const getArticles = (): BaseArticle[] => { //all articles from db
  return [
    {
      id: "lol123",
      title: "The Desert Temple",
      text: `It is a long established fact that
            a reader will\nbe distracted by the readable
            content of a page when looking at its layout.
            The point of using Lorem Ipsum is that it has
            a more-or-less normal distribution of letters,
            as opposed to using 'Content here, content here',
            making it look like readable English. Many desktop
            publishing packages and web page editors now use 
            Lorem Ipsum as their default model text, and a
            search for 'lorem ipsum' will uncover
            many web sites still in their infancy. 
            Various versions have evolved over the
            years, sometimes by accident, sometime
            s on purpose (injected humour and the like).`,
      tags: ["Adventure", "1AD&D"],
      type: "Adventure",
      imgSrc: "/temple.jpg",
      date: new Date(),
      author: "Arriburi"
    },
    {
      id: "srar32",
      title: "Isle of Dread",
      text: "Map of the isle of dread",
      tags: ["Map"],
      type: "Map",
      imgSrc: "/isle.png",
      date: new Date(),
      author: "Arriburi"
    },
    {
      id: "sjhnaut0",
      title: "Skibold",
      text: `Some of the smallest draconic creatures
             in the multiverse, kobolds display their 
             draconic ancestry in the glint of their scales 
             and in their roars. Legends tell of the first kobolds
             emerging from the Underdark near the lairs of the
             earliest dragons. In some lands, kobolds serve
             chromatic or metallic dragons — even worshiping
             them as divine beings. In other places, kobolds
             know too well how dangerous those dragons can be
             and help others defend against draconic destruction.`,
      tags: ["NPC"],
      type: "Monster",
      imgSrc: "/kobold.jpg",
      date: new Date(),
      author: "Arriburi"
    }
  ];
}

export const getArticleById = <K extends string, T extends BaseArticle<K>>(id: string): T => { //return a single article (the id)
  const article: SpellArticle = {
    id: id,
    title: "Isle of Dread",
    text: "Map of the isle of dread",
    tags: ["Map"],
    imgSrc: "/isle.png",
    type: "Spell",
    properties: [{ key: "Level", value: "Magic user 1" }, { key: "Range", value: 5 }, { key: "Duration", value: 1 }],
    date: new Date(),
    author: "Arriburi"
  };
  return article as T;
}