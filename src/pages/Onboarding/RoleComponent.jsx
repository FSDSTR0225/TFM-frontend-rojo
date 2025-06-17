import React, { useEffect } from "react";

const inputClasses = "w-full px-3 py-2 text-sm bg-neutral-90 text-neutral-0 border border-neutral-60 rounded placeholder-neutral-40 placeholder:italic";
const labelClasses = "text-base text-neutral-20 mb-1";

export const RoleComponent = ({ data, onDataChange, onValidChange }) => {
  const role = 'developer'; // fijo para este componente

  const handleChange = (e) => {
    const { id, value } = e.target;
    onDataChange({ ...data, [role]: { ...data[role], [id]: value } });
  };

  useEffect(() => {
    const fields = data[role] || {};
    const allFilled = Object.values(fields).every(val => val.trim?.() !== "");
    onValidChange?.(allFilled);
  }, [data, onValidChange]);

  const get = (id) => data?.[role]?.[id] || "";

  return (
    <div className="h-full w-full flex items-start justify-center px-4 max-h-[430px] overflow-y-auto m-4 md:mt-10">
      <div className="w-full max-w-2xl space-y-4">
        <div className="space-y-4">
          <div className="grid">
            <label htmlFor="position" className={labelClasses}>Professional Position</label>
            <input id="position" placeholder="Frontend, Backend..." className={inputClasses} value={get("position")} onChange={handleChange} />
          </div>
          <div className="grid">
            <label htmlFor="experience" className={labelClasses}>Experience Years</label>
            <input id="experience" placeholder="3" className={inputClasses} value={get("experience")} onChange={handleChange} />
          </div>
          <div className="grid">
            <label htmlFor="location" className={labelClasses}>Location</label>
            <input id="location" placeholder="City, Country" className={inputClasses} value={get("location")} onChange={handleChange} />
          </div>
          <div className="grid">
            <label htmlFor="skills" className={labelClasses}>Skills (comma-separated)</label>
            <input id="skills" placeholder="React, Node.js, MongoDB" className={inputClasses} value={get("skills")} onChange={handleChange} />
          </div>
          <div className="grid">
            <label htmlFor="languages" className={labelClasses}>Languages (comma-separated)</label>
            <input id="languages" placeholder="English:C1,Spanish:B2" className={inputClasses} value={get("languages")} onChange={handleChange} />
          </div>
          <div className="grid">
            <label htmlFor="linkedin" className={labelClasses}>LinkedIn</label>
            <input id="linkedin" placeholder="https://linkedin.com/in/..." className={inputClasses} value={get("linkedin")} onChange={handleChange} />
          </div>
          <div className="grid">
            <label htmlFor="github" className={labelClasses}>GitHub</label>
            <input id="github" placeholder="https://github.com/..." className={inputClasses} value={get("github")} onChange={handleChange} />
          </div>
          <div className="grid">
            <label htmlFor="instagram" className={labelClasses}>Instagram</label>
            <input id="instagram" placeholder="https://instagram.com/..." className={inputClasses} value={get("instagram")} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};
