import Boxlist from "../../../components/Boxlist";
import Article from "../../../components/Article";



export default async function ArticleDisplay({ params }: { params: { article: number } }) {

  const id = (await params).article;
  console.log("THE ID OF THIS IS", id);

  return (

    <main>
      <div className=" flex flex-row">
        <div className="flex-1 bg-accent p-[20px] mr-4 py-8">
          <div className="container mx-auto px-4" >
            <Article id={id} />
          </div>
        </div>
        <div className="w-[200px]">
          <Boxlist />
        </div>
      </div>
    </main>
  );
}
