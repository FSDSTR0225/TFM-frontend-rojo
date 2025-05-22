import { useEffect } from "react";
import { useState } from "react";
import { getSkillsByQuery } from "../../../services/offersServices";
import { set } from "react-hook-form";

export const TagsInputRecruiter = ({ value = [], onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const skills = async (inputValue) => {
    const skillsSuggestions = await getSkillsByQuery(inputValue);
    console.log("🚀 ~ skills:", skillsSuggestions);
    setSuggestions(skillsSuggestions);
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      if (inputValue.length > 0) {
        skills(inputValue);
      } else {
        setSuggestions([]);
      }
    }, 300)

    return () => clearTimeout(delay)
  }, [inputValue])



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
    setSuggestions([]);
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleSuggestionClick = (suggestion) => {
    addTags([suggestion.name]);
    setInputValue("");
  };


  return (
    <div className="relative">
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
            placeholder={
              inputValue === "" && value.length === 0
                ? "Enter tags separated by commas"
                : ""
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Evita que el formulario se envíe y cierre el modal
              }
            }}
          />
        )}
      </div>

      {/* Lista de sugerencias adaptada a modo oscuro */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-neutral-90 border border-neutral-60 mt-1 w-full rounded shadow max-h-40 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer p-2 hover:bg-neutral-80 text-neutral-0 text-sm"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
