import React, { useEffect, useState } from "react";
import { getAllSkills } from "../../services/offersServices";

export const RoleComponent2 = ({ data, onDataChange, onValidChange }) => {
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(() =>
    data && data.skills ? data.skills : []
  );

  // Cargar habilidades al iniciar
  useEffect(() => {
    const loadSkills = async () => {
      const skills = await getAllSkills();
      setAllSkills(skills);
    };
    loadSkills();
  }, []);

  // Actualizar datos y validación
  useEffect(() => {
    onDataChange({ skills: selectedSkills });
    onValidChange?.(selectedSkills.length > 0);
  }, [selectedSkills, onDataChange, onValidChange]);

  const toggleSkill = (skillName) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName)
        ? prev.filter((s) => s !== skillName)
        : prev.length < 10
        ? [...prev, skillName]
        : prev
    );
  };
  return (
    <div className="flex justify-center items-start w-full max-h-screen mt-6 overflow-hidden">
      <div className="p-4 max-w-3xl w-full">
        <h5 className="text-md font-semibold text-neutral-20 mb-3">
          Select up to 10 skills
        </h5>

        <div
          className="flex flex-wrap gap-3 overflow-y-auto mb-6"
          style={{ maxHeight: "320px" }} // o '500px' para desktop, lo que prefieras
        >
          {allSkills.map((skill) => (
            <button
              key={skill.name}
              type="button"
              onClick={() => toggleSkill(skill.name)}
              className={`px-3 py-1 rounded-full text-sm transition ${
                selectedSkills.includes(skill.name)
                  ? "bg-primary-60 text-neutral-0"
                  : "bg-transparent border border-neutral-30 text-neutral-30 hover:bg-neutral-40"
              }`}
            >
              {skill.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
