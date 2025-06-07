import React, { useEffect } from "react";

export const RoleComponent2 = ({ data, onDataChange, onValidChange }) => {
  // Handler para actualizar data
  const handleChange = (e) => {
    const { id, value } = e.target;
    onDataChange({ ...data, [id]: value });
  };

  useEffect(() => {
    // Validación sencilla: todos los campos con texto no vacío
    const allFilled = Object.values(data || {}).every(val => val.trim() !== "");
    onValidChange?.(allFilled);
  }, [data, onValidChange]);

  const get = (id) => data?.[id] || "";

  return (
    <div className="space-y-4">
      <div className="grid">
        <label htmlFor="name" className="mb-1 font-medium">Name</label>
        <input
          id="name"
          placeholder="Your name"
          className="w-full px-3 py-2 border rounded"
          value={get("name")}
          onChange={handleChange}
        />
      </div>

      <div className="grid">
        <label htmlFor="description" className="mb-1 font-medium">Description</label>
        <textarea
          id="description"
          placeholder="Add a description"
          className="w-full px-3 py-2 border rounded resize-none"
          style={{ height: "6rem" }}
          value={get("description")}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
