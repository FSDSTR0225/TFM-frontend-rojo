import { useState, useRef, useEffect } from "react";
import {
  searchProjects,
  searchDevs,
  searchOffers,
} from "../../services/searchService";

const searchOptions = [
  { label: "Projects", value: "projects" },
  { label: "Developers", value: "devs" },
  { label: "Offers", value: "offers" },
];

export function SearchBar({ onResults }) {
  const [selectedOption, setSelectedOption] = useState(searchOptions[0]);
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    let results = [];
    switch (selectedOption.value) {
      case "projects":
        results = await searchProjects(query);
        break;
      case "devs":
        results = await searchDevs(query);
        break;
      case "offers":
        results = await searchOffers(query);
        break;
      default:
        break;
    }

    onResults?.(results, selectedOption.value);
  };

  return (
    <form
      className="max-w-lg mx-auto border border-neutral-55 rounded-lg "
      onSubmit={handleSearch}
    >
      <div className="flex">
        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium bg-neutral-60  border-none rounded-s-lg hover:bg-neutral-55 cursor-pointer"
          >
            {selectedOption.label}
            <svg className="w-2.5 h-2.5 ms-2.5" fill="none" viewBox="0 0 10 6">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute z-20 mt-2 bg-neutral-60 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-44">
              <ul className="py-2 text-sm">
                {searchOptions.map((opt) => (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOption(opt);
                        setDropdownOpen(false);
                      }}
                      className="inline-flex w-full px-4 py-2 hover:bg-neutral-50 cursor-pointer"
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="relative w-full">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${selectedOption.label}...`}
            className="block p-2.5 w-full z-20 text-sm  bg-neutral-80 rounded-e-lg border-none focus:bg-neutral-55 focus:outline-none focus:ring-0 placeholder:font-normal placeholder-neutral-30"
            required
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-gradient-to-br from-primary-50 to-secondary-50  rounded-e-lg border border-none hover:bg-blue-800 focus:ring-0 focus:outline-none cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}
