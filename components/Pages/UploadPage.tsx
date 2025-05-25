import Boxlist from "@/components/Boxlist";
import ArticleForm from "@/components/ArticleForm";
import { Suspense } from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function UploadPage() {
  return (
    <main>
      <div className="flex flex-row">
        <div className="flex-1 rounded-md shadow-lg bg-primary p-[20px] mr-4 py-8">
          <Suspense fallback={<LoadingSpinner />}>
            <ArticleForm />
          </Suspense>
        </div>
        <div className="w-[200px]">
          <Suspense fallback={<LoadingSpinner />}>
            <Boxlist />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
