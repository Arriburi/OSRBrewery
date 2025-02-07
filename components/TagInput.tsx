import { useState } from "react";


type TagInputProps = {
  tags: string[];
  onChange: (tags: string[]) => void;
};


export default function TagInput({ tags = [], onChange }: TagInputProps) {

  const [tag, setTag] = useState("");


  function addTag(tagToAdd: string) {
    const capitalizedTag = tagToAdd.charAt(0).toUpperCase() + tagToAdd.slice(1).toLowerCase();
    if (capitalizedTag != "" && !tags.includes(capitalizedTag)) {
      onChange([...tags, capitalizedTag]);
    }
    setTag("")
  }

  function removeTag(tagToRemove: string) {
    onChange(tags.filter((singleTag) => singleTag !== tagToRemove))
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Tags</label>
      <div className="flex items-center space-x-2">
        <input
          value={(tag)}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Add a tag"
          className="flex-grow px-3 py-2 bg-primary text-foreground rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="button" //important otherwise it does onSubmit
          onClick={() => {
            addTag(tag);
          }} className="bg-accent2 hover:bg-secondary px-3 py-2 rounded-md text-black font-medium"
        > Add tag </button>
      </div>
      <div className="flex flex-wrap mt-2 mr-2">
        {tags.map((tag, index) => (
          <div key={index} className="bg-accent text-black mb-2 mr-1 px-3 py-1 rounded-full text-sm flex items-center space-x-2">
            <span>{tag}</span>
            <button onClick={() => removeTag(tag)} className="ml-1 text-red-400 hover:text-red-600"
              type="button"
            >x</button>
          </div>))}
      </div>
    </div >
  )
}