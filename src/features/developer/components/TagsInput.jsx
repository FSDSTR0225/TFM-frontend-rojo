import { useState } from "react";

export const TagsInput = ({ value = [], onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const addTags = (tags) => {
    const newTags = tags
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "" && !value.includes(tag));

    const combined = [...value, ...newTags];
    if (combined.length > 10) {
      onChange(combined.slice(0, 10));
    } else {
      onChange(combined);
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim() === "") return;
      addTags(inputValue.split(","));
      setInputValue("");
    }
  };

  return (
    <div className="border border-neutral-60 rounded px-2 py-2.5 bg-neutral-90 flex flex-wrap gap-1">
      {value.map((tag) => (
        <div
          key={tag}
          className="bg-primary-60 text-neutral-0 rounded-full px-3 py-1 flex items-center gap-2 text-sm"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="font-bold hover:text-primary-40"
            aria-label={`Remove tag ${tag}`}
          >
            ×
          </button>
        </div>
      ))}

      {value.length < 10 && (
        <input
          type="text"
          className="bg-transparent outline-none flex-grow min-w-[100px] text-neutral-0 text-sm placeholder-neutral-40 placeholder:italic ml-1"
          placeholder={inputValue === "" && value.length === 0 ? "Enter tags separated by commas" : ""}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};
