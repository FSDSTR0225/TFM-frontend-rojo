import React, { useEffect } from "react";

// GENERAL STYLES
const inputClasses = "w-full px-3 py-2 text-sm bg-neutral-90 text-neutral-0 border border-neutral-60 rounded placeholder-neutral-40 placeholder:italic";
const labelClasses = "text-base text-neutral-20 mb-1";

export const UserComponent = ({ onValidChange, data, onDataChange }) => {
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
    onDataChange({ phone: value });
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 500) {
      onDataChange({ description: value });
    }
  };

  const handleBirthDateChange = (e) => {
    onDataChange({ birthDate: e.target.value });
  };

  useEffect(() => {
    const phone = data.phone || "";
    const description = data.description || "";
    const birthDate = data.birthDate || "";

    const digitsOnly = phone.replace(/\D/g, "");
    const validPhone = phone.startsWith("+") && digitsOnly.length >= 8;
    const validDescription = description.trim().length > 0 && description.length <= 500;
    const validBirthDate = birthDate.trim().length > 0;

    onValidChange && onValidChange(validPhone && validDescription && validBirthDate);
  }, [data, onValidChange]);

  return (
    <div className="h-full w-full flex items-center justify-center px-4">
      <div className="w-full max-w-2xl space-y-4 -translate-y-20">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1 grid">
            <label htmlFor="birthDate" className={labelClasses}>
              Your birth date
            </label>
            <input
              id="birthDate"
              type="date"
              className={inputClasses}
              value={data.birthDate || ""}
              onChange={handleBirthDateChange}
            />
          </div>
          <div className="flex-1 grid">
            <label htmlFor="phone" className={labelClasses}>
              Your phone number
            </label>
            <input
              id="phone"
              placeholder="+34 600600600"
              className={inputClasses}
              value={data.phone || ""}
              onChange={handlePhoneChange}
              maxLength={16}
            />
          </div>
        </div>

        <div className="grid">
          <label htmlFor="description" className={labelClasses}>
            About you
          </label>
          <textarea
            id="description"
            placeholder="Tell us about yourself (max 500 chars)"
            className={inputClasses + " resize-none"}
            style={{ height: "20vh" }}
            value={data.description || ""}
            onChange={handleDescriptionChange}
            maxLength={500}
          />
          <p className="text-xs text-neutral-40 text-right">{(data.description || "").length} / 500</p>
        </div>
      </div>
    </div>
  );
};
