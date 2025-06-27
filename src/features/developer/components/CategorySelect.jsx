import React, { useState, useEffect } from "react";

const categories = [
  "Frontend",
  "Backend",
  "Full Stack",
  "Mobile",
  "DevOps",
  "UX/UI",
];

export const CategorySelect = ({ register, error, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = (category) => {
    setSelected(category);
    setValue("category", category, { shouldValidate: true });
    setIsOpen(false);
  };

  useEffect(() => {
    register("category", { required: true });
  }, [register]);

  return (
    <div className="relative w-full">
      <div
        className={`input input-bordered bg-neutral-90 text-neutral-20 border-neutral-60 w-full cursor-pointer select-none pr-2 flex justify-between items-center`}
        onClick={toggleOpen}
      >
        <span className={`${!selected ? "text-neutral-40 italic" : ""}`}>
          {selected || "Select an option"}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-neutral-90 border border-neutral-60 rounded shadow max-h-60 overflow-auto"
          role="listbox"
          tabIndex={-1}
        >
          {categories.map((cat, i) => (
            <li
              key={cat}
              role="option"
              tabIndex={0}
              onClick={() => handleSelect(cat)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`cursor-pointer px-4 py-2 text-sm ${
                hoveredIndex === i ? "bg-primary-60 text-white" : "text-neutral-20"
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-1 text-sm text-red-500">Category is required</p>}
    </div>
  );
};
