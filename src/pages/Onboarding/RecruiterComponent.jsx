import React, { useEffect } from "react";

const inputClasses = "w-full px-3 py-2 text-sm bg-neutral-90 text-neutral-0 border border-neutral-60 rounded placeholder-neutral-40 placeholder:italic";
const labelClasses = "text-base text-neutral-20 mb-1";

export const RecruiterComponent = ({ data, onDataChange, onValidChange }) => {
  const role = 'recruiter'; // fijo para este componente

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid">
              <label htmlFor="companyName" className={labelClasses}>Name</label>
              <input id="companyName" placeholder="Your Company" className={inputClasses} value={get("companyName")} onChange={handleChange} />
            </div>
            <div className="grid">
              <label htmlFor="companyLocation" className={labelClasses}>Location</label>
              <input id="companyLocation" placeholder="City, Country" className={inputClasses} value={get("companyLocation")} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid">
              <label htmlFor="contactEmail" className={labelClasses}>Email</label>
              <input id="contactEmail" placeholder="contact@example.com" className={inputClasses} value={get("contactEmail")} onChange={handleChange} />
            </div>
            <div className="grid">
              <label htmlFor="contactPhone" className={labelClasses}>Phone</label>
              <input id="contactPhone" placeholder="+1234567890" className={inputClasses} value={get("contactPhone")} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid">
              <label htmlFor="sector" className={labelClasses}>Sector</label>
              <input id="sector" placeholder="Tech, Marketing..." className={inputClasses} value={get("sector")} onChange={handleChange} />
            </div>
            <div className="grid">
              <label htmlFor="website" className={labelClasses}>Website</label>
              <input id="website" placeholder="https://..." className={inputClasses} value={get("website")} onChange={handleChange} />
            </div>
          </div>

          <div className="grid">
            <label htmlFor="companyDescription" className={labelClasses}>About the company</label>
            <textarea
              id="companyDescription"
              placeholder="Company details..."
              className={inputClasses + " resize-none"}
              style={{ height: "10vh" }}
              value={get("companyDescription")}
              onChange={handleChange}
              maxLength={500}
            />
            <p className="text-xs text-neutral-40 text-right">
              {get("companyDescription")?.length || 0} / 250
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
