import React, { useEffect, useState, useCallback } from "react";

const inputClasses =
  "w-full px-3 py-2 text-sm bg-neutral-90 text-neutral-0 border border-neutral-60 rounded placeholder-neutral-40 placeholder:italic";
const labelClasses = "text-base text-neutral-20 mb-1";
const errorClasses = "text-xs text-red-500 mt-1";

export const RecruiterComponent = ({ data, onDataChange, onValidChange }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (id, value) => {
    switch (id) {
      case "contactEmail":
        return value && (!value.includes("@") || !value.includes("."))
          ? "Invalid email format"
          : "";
      case "website":
        return value.trim() === "" ? "Website is required" : "";
      case "companyName":
      case "location":
      case "sector":
        return value.trim() === "" ? "This field is required" : "";
      case "contactPhone":
        return value.trim().length < 8 ? "Invalid phone number" : "";
      default:
        return "";
    }
  };

  const validateAll = useCallback(() => {
    const newErrors = {};
    const fields = [
      "companyName",
      "location",
      "contactEmail",
      "contactPhone",
      "sector",
      "website",
    ];

    fields.forEach((field) => {
      const value = data?.[field] || "";
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    onValidChange?.(Object.keys(newErrors).length === 0);
  }, [data, onValidChange]);

  useEffect(() => {
    validateAll();
  }, [validateAll]);

  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));
    const error = validateField(id, data?.[id] || "");
    setErrors((prev) => ({ ...prev, [id]: error }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^\d+ ]/g, "");
    if (!value.startsWith("+")) {
      value = "+" + value.replace(/\+/g, "");
    }
    if (value.length > 3) {
      const prefix = value.slice(0, 3);
      let rest = value.slice(3).replace(/\s+/g, "");
      value = prefix + " " + rest;
    }
    onDataChange({ ...data, contactPhone: value });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    onDataChange({ ...data, [id]: value });
  };

  const get = (id) => data?.[id] || "";

  return (
    <div className="flex justify-center items-start md:items-center w-full h-full px-4 max-h-[430px] overflow-y-auto m-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Grupo 1 */}
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="companyName" className={labelClasses}>
              Name
            </label>
            <input
              id="companyName"
              placeholder="Your Company"
              className={inputClasses}
              value={get("companyName")}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.companyName && errors.companyName && (
              <p className={errorClasses}>{errors.companyName}</p>
            )}
          </div>
          <div className="flex flex-col flex-1 mt-4 md:mt-0">
            <label htmlFor="location" className={labelClasses}>
              Location
            </label>
            <input
              id="location"
              placeholder="City, Country"
              className={inputClasses}
              value={get("location")}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.location && errors.location && (
              <p className={errorClasses}>{errors.location}</p>
            )}
          </div>
        </div>

        {/* Grupo 2 */}
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="contactEmail" className={labelClasses}>
              Email
            </label>
            <input
              id="contactEmail"
              placeholder="contact@example.com"
              className={inputClasses}
              value={get("contactEmail")}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.contactEmail && errors.contactEmail && (
              <p className={errorClasses}>{errors.contactEmail}</p>
            )}
          </div>
          <div className="flex flex-col flex-1 mt-4 md:mt-0">
            <label htmlFor="contactPhone" className={labelClasses}>
              Phone
            </label>
            <input
              id="contactPhone"
              placeholder="+34 600600600"
              className={inputClasses}
              value={get("contactPhone")}
              onChange={handlePhoneChange}
              onBlur={handleBlur}
            />
            {touched.contactPhone && errors.contactPhone && (
              <p className={errorClasses}>{errors.contactPhone}</p>
            )}
          </div>
        </div>

        {/* Grupo 3 */}
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="sector" className={labelClasses}>
              Sector
            </label>
            <input
              id="sector"
              placeholder="Tech, Marketing..."
              className={inputClasses}
              value={get("sector")}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.sector && errors.sector && (
              <p className={errorClasses}>{errors.sector}</p>
            )}
          </div>
          <div className="flex flex-col flex-1 mt-4 md:mt-0">
            <label htmlFor="website" className={labelClasses}>
              Website
            </label>
            <div className="flex">
              <span className="bg-neutral-70 text-neutral-30 text-sm px-2 py-2 rounded-l border border-r-0 border-neutral-60">
                https://
              </span>
              <input
                id="website"
                className={inputClasses + " rounded-l-none"}
                placeholder="yourcompany.com"
                value={get("website").replace(/^https?:\/\//, "")}
                onChange={(e) =>
                  handleChange({
                    target: {
                      id: "website",
                      value: "https://" + e.target.value,
                    },
                  })
                }
                onBlur={handleBlur}
              />
            </div>
            {touched.website && errors.website && (
              <p className={errorClasses}>{errors.website}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
