'use client'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { SpellKeys, MonsterKeys } from '../types/data';
import TagInput from "./TagInput";
import { useEffect } from "react";

type Inputs = {
  title: string;
  text: string;
  tags: string[];
  type: string;
  properties?: string[];
  imgSrc?: string;
};

function getKeysByType(inputType: string): string[] {
  if (inputType == "Spell") {
    return [...SpellKeys];
  } else if (inputType == "Monster") {
    return [...MonsterKeys];
  } else
    return []
}

export default function ArticleForm() {
  const {
    control,
    register,
    unregister,
    handleSubmit,
    watch,
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => console.log("Form data:", data);

  const inputType = watch("type");
  const typeKeys = getKeysByType(inputType)

  useEffect(() => {
    // You can unregister `properties` completely when type changes
    unregister("properties");
  }, [inputType, unregister]); // Only re-run when inputType changes

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*TYPE ARTICLE*/}
        <label className="block text-sm font-medium mb-1">Type of Article</label>
        <select className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
          {typeKeys.map((key, index) => (
            <div className="mb-4" key={index}>
              <label className="block text-sm font-medium mb-1">{key}</label>
              <input className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                {...register(`properties.${index}`)} />
            </div>
          ))}
        </div>
        {/* TITLE */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input placeholder="Insert title" className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("title")} />
        </div>

        {/* TEXT/DESCRIPTION */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea placeholder="Insert description" rows={6} className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none" {...register("text")} />
        </div>

        {/* UPLOAD INPUT */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Upload File (Image or PDF)</label>
          <Controller
            control={control}
            name="imgSrc"
            render={({ field: { onChange } }) => (
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none file:py-2 file:px-4 file:rounded-md file:border-none file:bg-blue-600 file:text-white file:cursor-pointer"
                onChange={(e) => {
                  onChange(e.target.files ? e.target.files[0] : null);
                }}
              />
            )}
          />
        </div>
        {/* TAGS INPUT */}
        <Controller
          control={control}
          name="tags"
          render={({ field: { onChange, value } }) => (
            <TagInput onChange={onChange} value={value} />
          )}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-medium focus:ring-2 focus:ring-blue-400"
          >
            Post
          </button>
        </div>
      </form>
    </div >
  )
}