import React, { useEffect, useState } from "react";
import { PiTrashSimple } from "react-icons/pi";

const inputClasses =
  "w-full px-3 py-2 text-sm bg-neutral-90 text-neutral-0 border border-neutral-60 rounded placeholder-neutral-40 placeholder:italic";
const labelClasses = "text-base text-neutral-20 mb-1";
const errorClasses = "text-xs text-red-500 mt-1";

export const RoleComponent = ({ data, onDataChange, onValidChange }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (id, value) => {
    switch (id) {
      case "professionalPosition":
      case "location":
        return value.trim() === "" ? "This field is required" : "";
      case "experienceYears":
        return isNaN(value) || Number(value) < 0
          ? "Must be a positive number"
          : "";
      case "linkedin":
      case "github":
        return "";
      default:
        return "";
    }
  };

  const validateAll = () => {
    const newErrors = {};
    const fields = [
      "professionalPosition",
      "experienceYears",
      "location",
      "linkedin",
      "github",
    ];

    fields.forEach((field) => {
      const value = data?.[field] || "";
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    onValidChange?.(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateAll();
  }, [data]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));
    onDataChange({ ...data, [id]: value });
  };

  const handleExperienceChange = (e) => {
    let value = e.target.value;
    if (/^\d*$/.test(value)) {
      setTouched((prev) => ({ ...prev, experienceYears: true }));
      onDataChange({ ...data, experienceYears: value });
    }
  };

  const handleLanguageChange = (index, field, value) => {
    const newLanguages = [...(data.languages || [])];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    onDataChange({ ...data, languages: newLanguages });
  };

  const addLanguage = () => {
    const newLanguages = [...(data.languages || [])];
    newLanguages.push({ language: "", languageLevel: "" });
    onDataChange({ ...data, languages: newLanguages });
  };

  const removeLanguage = (index) => {
    const newLanguages = [...(data.languages || [])];
    newLanguages.splice(index, 1);
    onDataChange({ ...data, languages: newLanguages });
  };

  const get = (id) => data?.[id] || "";

  return (
    <div className="flex justify-center items-start w-full h-full py-8 px-4 max-h-[500px] md:max-h-[350px] overflow-y-auto m-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex flex-col">
          <label htmlFor="professionalPosition" className={labelClasses}>
            Your professional position
          </label>
          <input
            id="professionalPosition"
            placeholder="e.g. Frontend Developer"
            className={inputClasses}
            value={get("professionalPosition")}
            onChange={handleChange}
          />
          {touched.professionalPosition && errors.professionalPosition && (
            <p className={errorClasses}>{errors.professionalPosition}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="experienceYears" className={labelClasses}>
              Your year of experience
            </label>
            <input
              id="experienceYears"
              placeholder="e.g. 3"
              className={inputClasses}
              value={get("experienceYears")}
              onChange={handleExperienceChange}
              inputMode="numeric"
            />
            {touched.experienceYears && errors.experienceYears && (
              <p className={errorClasses}>{errors.experienceYears}</p>
            )}
          </div>

          <div className="flex flex-col flex-1 mt-4 md:mt-0">
            <label htmlFor="location" className={labelClasses}>
              Your current location
            </label>
            <input
              id="location"
              placeholder="City, Country"
              className={inputClasses}
              value={get("location")}
              onChange={handleChange}
            />
            {touched.location && errors.location && (
              <p className={errorClasses}>{errors.location}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="linkedin" className={labelClasses}>
              LinkedIn
            </label>
            <div className="flex">
              <span className="bg-neutral-70 text-neutral-30 text-sm px-2 py-2 rounded-l border border-r-0 border-neutral-60">
                https://
              </span>
              <input
                id="linkedin"
                className={inputClasses + " rounded-l-none"}
                placeholder="linkedin.com/in/yourprofile"
                value={get("linkedin").replace(/^https?:\/\//, "")} // Sin https en el input
                onChange={(e) =>
                  handleChange({
                    target: {
                      id: "linkedin",
                      value: "https://" + e.target.value,
                    },
                  })
                }
              />
            </div>
            {touched.linkedin && errors.linkedin && (
              <p className={errorClasses}>{errors.linkedin}</p>
            )}
          </div>

          <div className="flex flex-col flex-1 mt-4 md:mt-0">
            <label htmlFor="github" className={labelClasses}>
              GitHub
            </label>
            <div className="flex">
              <span className="bg-neutral-70 text-neutral-30 text-sm px-2 py-2 rounded-l border border-r-0 border-neutral-60">
                https://
              </span>
              <input
                id="github"
                className={inputClasses + " rounded-l-none"}
                placeholder="github.com/yourprofile"
                value={get("github").replace(/^https?:\/\//, "")}
                onChange={(e) =>
                  handleChange({
                    target: {
                      id: "github",
                      value: "https://" + e.target.value,
                    },
                  })
                }
              />
            </div>
            {touched.github && errors.github && (
              <p className={errorClasses}>{errors.github}</p>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-left items-center mb-2 gap-6">
            <label className={labelClasses}>Languages</label>
            {/* Mostrar botón a la derecha sólo cuando no hay inputs */}
            {!data.languages?.length && (
              <button
                type="button"
                onClick={addLanguage}
                className="text-sm text-neutral-20 hover:text-neutral-0 bg-neutral-55 px-3 py-1 rounded"
              >
                + Add Language
              </button>
            )}
          </div>

          {(data.languages || []).map((lang, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:space-x-4 mb-3 items-center"
            >
              <div className="flex flex-col flex-1">
                <input
                  placeholder="Language"
                  className={inputClasses}
                  value={lang.language || ""}
                  onChange={(e) =>
                    handleLanguageChange(i, "language", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col flex-1 mt-4 md:mt-0">
                <input
                  placeholder="Level (e.g. Fluent, Intermediate)"
                  className={inputClasses}
                  value={lang.languageLevel || ""}
                  onChange={(e) =>
                    handleLanguageChange(i, "languageLevel", e.target.value)
                  }
                />
              </div>
              <button
                type="button"
                onClick={() => removeLanguage(i)}
                className="md:mt-0 text-primary-80 font-semibold"
                aria-label="Remove language"
                style={{ flexShrink: 0, width: 32, height: 32 }}
              >
                <PiTrashSimple size={20} />
              </button>
            </div>
          ))}

          {/* Mostrar botón debajo de inputs cuando hay al menos uno */}
          {data.languages?.length > 0 && (
            <button
              type="button"
              onClick={addLanguage}
              className="text-sm text-neutral-20 hover:text-neutral-0 bg-neutral-60 px-3 py-1 rounded"
            >
              + Add Language
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
