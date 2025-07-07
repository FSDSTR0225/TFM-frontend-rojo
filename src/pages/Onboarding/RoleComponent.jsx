import React, { useState, useEffect } from "react";
import { PiTrashSimple, PiGithubLogo, PiLinkedinLogo } from "react-icons/pi";

const inputClasses =
  "w-full px-3 py-2 text-sm bg-neutral-90 text-neutral-0 border border-neutral-60 rounded placeholder-neutral-40 placeholder:italic";
const labelClasses = "text-base text-neutral-20 mb-1";
const errorClasses = "text-xs text-red-500 mt-1";

export const RoleComponent = ({
  data,
  onDataChange,
  onValidChange,
  showErrors,
}) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = {};

    // Validar campos obligatorios
    if (!data.professionalPosition || data.professionalPosition.trim() === "") {
      newErrors.professionalPosition = "This field is required";
    }

    if (!data.experienceYears || data.experienceYears.trim() === "") {
      newErrors.experienceYears = "This field is required";
    } else if (
      isNaN(data.experienceYears) ||
      Number(data.experienceYears) < 0
    ) {
      newErrors.experienceYears = "Must be a positive number";
    }

    if (!data.location || data.location.trim() === "") {
      newErrors.location = "This field is required";
    }

    // Validar linkedin y github si tienen valor (opcional)
    if (data.linkedin && data.linkedin.trim() !== "") {
      if (!/^https:\/\/.+/.test(data.linkedin.trim())) {
        newErrors.linkedin = "Must be a valid URL starting with https://";
      }
    }
    if (data.github && data.github.trim() !== "") {
      if (!/^https:\/\/.+/.test(data.github.trim())) {
        newErrors.github = "Must be a valid URL starting with https://";
      }
    }

    // Validar idiomas: al menos un idioma con ambos campos rellenos
    const languages = data.languages || [];
    const hasValidLanguage = languages.some(
      (lang) =>
        lang.language &&
        lang.language.trim() !== "" &&
        lang.languageLevel &&
        lang.languageLevel.trim() !== ""
    );
    if (!hasValidLanguage) {
      newErrors.languages = "At least one language with level is required";
    }

    setErrors(newErrors);
    onValidChange?.(Object.keys(newErrors).length === 0);
  }, [data, onValidChange]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    onDataChange({ ...data, [id]: value });
  };

  const handleExperienceChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
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

  const languages =
    data.languages && data.languages.length > 0
      ? data.languages
      : [{ language: "", languageLevel: "" }];

  return (
    <div className="flex justify-center items-start w-full h-full py-8 px-4 max-h-[500px] md:max-h-[360px] overflow-y-auto mt-6">
      <div className="w-full max-w-2xl space-y-6">
        {/* Primera fila */}
        <div className="flex flex-col md:flex-row md:space-x-4" id="role-row-1">
          <div className="flex flex-col flex-1 min-w-0 mb-4 md:mb-0">
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
            {showErrors && errors.professionalPosition && (
              <p className={errorClasses}>{errors.professionalPosition}</p>
            )}
          </div>

          <div className="flex flex-col md:w-24 min-w-[10rem] mb-4 md:mb-0">
            <label htmlFor="experienceYears" className={labelClasses}>
              Experience (years)
            </label>
            <input
              id="experienceYears"
              placeholder="e.g. 3"
              className={inputClasses}
              value={get("experienceYears")}
              onChange={handleExperienceChange}
              inputMode="numeric"
            />
            {showErrors && errors.experienceYears && (
              <p className={errorClasses}>{errors.experienceYears}</p>
            )}
          </div>

          <div className="flex flex-col flex-1 min-w-0">
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
            {showErrors && errors.location && (
              <p className={errorClasses}>{errors.location}</p>
            )}
          </div>
        </div>

        <hr className="border-t border-neutral-60 my-4" />

        {/* Segunda fila */}
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
          <div className="flex flex-1 min-w-0 flex-col">
            <label
              htmlFor="linkedin"
              className={labelClasses + " flex items-center"}
            >
              <PiLinkedinLogo className="text-neutral-20 mr-2" size={20} />
              LinkedIn
            </label>
            <div className="flex">
              <span className="bg-neutral-70 text-neutral-30 text-sm px-2 py-2 rounded-l border border-r-0 border-neutral-60">
                https://
              </span>
              <input
                id="linkedin"
                className={inputClasses}
                placeholder="linkedin.com/in/yourprofile"
                value={get("linkedin").replace(/^https?:\/\//, "")}
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
            {showErrors && errors.linkedin && (
              <p className={errorClasses}>{errors.linkedin}</p>
            )}
          </div>

          <div className="flex flex-1 min-w-0 flex-col">
            <label
              htmlFor="github"
              className={labelClasses + " flex items-center"}
            >
              <PiGithubLogo className="text-neutral-20 mr-2" size={20} />
              GitHub
            </label>
            <div className="flex">
              <span className="bg-neutral-70 text-neutral-30 text-sm px-2 py-2 rounded-l border border-r-0 border-neutral-60">
                https://
              </span>
              <input
                id="github"
                className={inputClasses}
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
            {showErrors && errors.github && (
              <p className={errorClasses}>{errors.github}</p>
            )}
          </div>
        </div>

        <hr className="border-t border-neutral-60 my-4" />

        {/* Tercera fila - idiomas */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-0">
            <label className={labelClasses}>Languages</label>
            <button
              type="button"
              onClick={addLanguage}
              className="text-sm text-neutral-20 hover:text-neutral-0 bg-neutral-55 px-3 py-1 rounded ml-4"
            >
              + Add Language
            </button>
          </div>

          {languages.map((lang, i, arr) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:space-x-4 mt-2 items-center"
            >
              <input
                placeholder="Language"
                className={inputClasses + " flex-1 mb-2 md:mb-0"}
                value={lang.language || ""}
                onChange={(e) =>
                  handleLanguageChange(i, "language", e.target.value)
                }
              />
              <input
                placeholder="Level (e.g. Fluent, Intermediate)"
                className={inputClasses + " flex-1"}
                value={lang.languageLevel || ""}
                onChange={(e) =>
                  handleLanguageChange(i, "languageLevel", e.target.value)
                }
              />
              {arr.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLanguage(i)}
                  className="md:mt-0 text-primary-80 font-semibold ml-2"
                  aria-label="Remove language"
                  style={{ flexShrink: 0, width: 32, height: 32 }}
                >
                  <PiTrashSimple size={20} />
                </button>
              )}
            </div>
          ))}

          {/* Mostrar error de idiomas */}
          {showErrors && errors.languages && (
            <p className={errorClasses}>{errors.languages}</p>
          )}
        </div>
      </div>
    </div>
  );
};
