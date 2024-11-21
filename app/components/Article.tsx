import Image from "next/image";
import Link from "next/link";

interface ArticleProp {
  title: string;
  text: string;
  tags: string[];
  imgSrc: string;
  linkHref: string;
}

export default function Article({ title, text, tags, imgSrc, linkHref }: ArticleProp) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center">
        <Link href={linkHref}>
          <div className="relative w-[250px] h-[200px]">
            <Image
              src={imgSrc}
              alt={title}
              layout="fill"
              className="shadow-[4px_4px_0px_rgba(0,0,0,1)] object-cover"
            />
          </div>
        </Link>
        <div className="flex flex-col pl-5">
          <div className="font-bold text-4xl">{title}</div>
          <div className="text-base mt-4">
            {tags.map((tag, index) => (
              <span key={index} className="mr-2 px-3 py-1 rounded bg-gray-900 text-white">#{tag}</span> // Display each tag with a space or separator
            ))}
          </div>
        </div>
      </div>
      <div className="py-8">
        <p>{text}</p>
      </div>
    </div>
  );
};