

interface Props {
  title: string;
  text: string;
}

export default function Article({ title, text }: Props) {
  return (
    <div className="flex flex-col mx-20 p-5">
      <div className="flex flex-row">
        <div className="h-[200px] w-[250px] bg-green-700"></div>
        <div className="flex flex-col pl-5 justify-around">
          <div className=" font-bold text-2xl">{title}</div>
          <div>Continues Tomorrow at 3 AM GMT+1</div>
        </div>
      </div>
      <div className="py-8">
        <p>{text}</p>
      </div>
    </div>
  );
};