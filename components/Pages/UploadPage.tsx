import Boxlist from "../../components/Boxlist";
import ArticleForm from "../../components/ArticleForm";


export default function UploadPage() {
  return (
    <main>
      <div className="flex flex-row">
        <div className="flex-1  rounded-md shadow-lg bg-primary p-[20px] mr-4 py-8">
          <ArticleForm />
        </div>
        <div className="w-[200px]">
          <Boxlist />
        </div>
      </div>
    </main>

  );
}
