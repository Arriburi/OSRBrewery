'use client'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { SpellKeys, MonsterKeys, MonsterKeysType, SpellKeysType, ArticleType, Properties } from '../types/data';
import TagInput from "./TagInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/app/actions/articles";

type Inputs = {
  title: string;
  description: string;
  tags: string[];
  type: ArticleType;
  properties?: Properties;
  imgSrc?: FileList;
};

function getKeysByType(inputType: string): MonsterKeysType[] | SpellKeysType[] {
  if (inputType == "Spell") {
    return [...SpellKeys];
  } else if (inputType == "Monster") {
    return [...MonsterKeys];
  } else
    return []
}

export default function ArticleForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    control,
    register,
    unregister,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setError(null); // Clear any previous errors
    const formData = new FormData();

    if (data.properties !== undefined) {
      const cleanedProperties = Object.fromEntries(
        Object.entries(data.properties).filter(([, value]) => {
          return value !== "" && value !== null && value !== undefined;
        })
      );
      formData.append("properties", JSON.stringify(cleanedProperties));
    }

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("type", data.type);

    if (data.imgSrc?.[0]) {
      formData.append("imgSrc", data.imgSrc[0]);
    }

    try {
      const result = await createArticle(formData);

      if (!result.success) {
        setError(result.error || 'Failed to save entry');
        return;
      }

      console.log("Entry saved successfully:", result);
      router.push('/');
    } catch (error) {
      console.error("Error submitting form:", error);
      setError('Error submitting form');
    }
  };

  const inputType = watch("type");
  const typeKeys = getKeysByType(inputType)

  useEffect(() => {
    unregister("properties");
    setValue("tags", [inputType]);  //delets all tags when type changes
  }, [inputType, unregister, setValue]);

  return (
    <div className="container mx-auto px-8">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*TYPE ARTICLE*/}
        <label className="block text-sm font-medium mb-1">Type of Article</label>
        <select className="w-full mb-4 px-3 py-2 bg-primary text-foreground rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          {...register("type")}>
          <option value="Default">Default</option>
          <option value="Spell">Spell</option>
          <option value="Monster">Monster</option>
          <option value="Adventure">Adventure</option>
          <option value="Map">Map</option>
          <option value="Magic Item">Magic Item</option>
          <option value="Other">Other</option>
        </select>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {typeKeys.map((key) => (
            <div className="mb-4" key={key}>
              <label className="block text-sm font-medium mb-1">{key}</label>
              <input
                className="w-full px-3 py-2 bg-primary text-foreground rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                {...register(`properties.${key}`)} />
            </div>
          ))}
        </div>
        {/* TITLE */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            placeholder="Insert title"
            className={`w-full px-3 py-2 bg-primary text-foreground rounded-md border ${errors.title ? 'border-red-500' : 'border-gray-600'} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>
          )}
        </div>
        {/* TEXT/DESCRIPTION */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea
            placeholder="Insert description"
            rows={6}
            className={`w-full px-3 py-2 bg-primary text-foreground rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-600'} focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none whitespace-pre-wrap`}
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && (
            <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>
          )}
        </div>
        {/* UPLOAD INPUT */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Upload File (Image or PDF)</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            className="w-full bg-primary text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none file:py-2 file:px-4 file:rounded-md file:border-none file:bg-accent file:text-black file:cursor-pointer"
            {...register("imgSrc")} />
        </div>
        {/* TAGS INPUT */}
        <Controller
          control={control}
          name="tags"
          render={({ field: { onChange, value } }) => (
            <TagInput onChange={onChange} tags={value} />
          )}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full bg-accent hover:bg-secondary py-2 px-4 rounded-md text-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            Post
          </button>
        </div>
      </form>
    </div>
  )
}