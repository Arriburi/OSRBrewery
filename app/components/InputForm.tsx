'use client'
import React, { useState } from "react";
import { SpellKeys, MonsterKeys } from "../types/data";

interface PostFormProps {
  onSubmit?: (data: { title: string; description: string; file?: File | null; tags: string[] }) => void;
}


function getKeysByType(inputType: string): string[] {
  if (inputType == "Spell") {
    return [...SpellKeys];
  } else if (inputType == "Monster") {
    return [...MonsterKeys];
  } else
    return [""]
}


export const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {

  const inputType = "Spell";
  const typeKeys = getKeysByType(inputType)


  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    const normalizedTag = tagInput.trim();

    // Normalize the first letter to uppercase and the rest to lowercase
    const capitalizedTag = normalizedTag.charAt(0).toUpperCase() + normalizedTag.slice(1).toLowerCase();

    if (capitalizedTag && !tags.includes(capitalizedTag)) {
      setTags([...tags, capitalizedTag]);
    }

    setTagInput(""); // Clear the input after adding the tag
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit({ title, description, file, tags });
    } else {
      console.log("Title:", title);
      console.log("Description:", description);
      console.log("File:", file?.name || "No file uploaded");
      console.log("Tags:", tags);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full">
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Insert title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={300}
            required
          />
          <p className="text-sm text-gray-400 mt-1">{title.length}/300</p>
        </div>
        {typeKeys.map((key, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={key} className="block text-sm font-medium mb-1">
              {key}
            </label>
            <input
              type="text"
              id={key}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder={key}
              value={key}
              required
            />
          </div>

        ))}
        {/* Description Input */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            placeholder="Write the text of the post"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* File Upload Input */}
        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium mb-1">
            Upload File (Image or PDF)
          </label>
          <input
            type="file"
            id="file"
            className="w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none file:py-2 file:px-4 file:rounded-md file:border-none file:bg-blue-600 file:text-white file:cursor-pointer"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
          />
          {file && (
            <p className="text-sm text-gray-400 mt-2">Selected File: {file.name}</p>
          )}
        </div>

        {/* Tags Input */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium mb-1">
            Tags
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              id="tags"
              className="flex-grow px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Add a tag and press Enter"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-white font-medium"
              onClick={handleAddTag}
            >
              Add Tag
            </button>
          </div>
          <div className="flex flex-wrap mt-2 space-x-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  className="ml-1 text-red-400 hover:text-red-600"
                  onClick={() => handleRemoveTag(tag)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-medium focus:ring-2 focus:ring-blue-400"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
