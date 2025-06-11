import { useEffect } from 'react';
import { useForm, useFieldArray  } from 'react-hook-form';

export default function NewExperienceModal({ open, setOpen, handleExperience, experience = null }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill
  } = useFieldArray({
    control,
    name: "experienceSkills"
  });

  useEffect(() => {
    if (experience) {
      reset({
        company: experience.company || "",
        companyLogo: experience.companyLogo || "",
        position: experience.position || "",
        startDate: experience.startDate
          ? experience.startDate.split("T")[0]
          : "",
        endDate: experience.endDate ? experience.endDate.split("T")[0] : "",
        experienceSkills:
          experience.experienceSkills?.map(skill => ({ skill })) || [{ skill: "" }]
      });
    } else {
      reset({
        company: "",
        companyLogo: "",
        position: "",
        startDate: "",
        endDate: "",
        experienceSkills: [{ skill: "" }]
      });
    }
  }, [experience, reset]);

  const onSubmit = (data) => {
    const formatted = {
      company: data.company,
      companyLogo: data.companyLogo,
      position: data.position,
      startDate: data.startDate,
      endDate: data.endDate,
      experienceSkills: data.experienceSkills
        .map(s => s.skill.trim())
        .filter(s => s)
    };
    handleExperience(formatted, experience?._id);
    reset();
    setOpen(false);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="modal modal-open fixed inset-0 flex justify-center items-center z-50">
      <div className="modal-box max-w-xl bg-neutral-80 border border-neutral-70 rounded-lg p-6 relative">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center">
            {experience ? "Editar experiencia" : "Nueva experiencia"}
          </h2>

          {/* Company */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Compañía</span>
            </label>
            <input
              {...register("company", { required: true })}
              placeholder="e.g Google"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
            />
            {errors.company && (
              <span className="text-red-500 text-sm">Este campo es requerido</span>
            )}
          </div>

          {/* CompanyLogo */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Logo de la Compañía</span>
            </label>
            <input
              {...register("companyLogo")}
              placeholder="e.g Google"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
            />
          </div>

          {/* Position */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Puesto</span>
            </label>
            <input
              {...register("position", { required: true })}
              placeholder="E.g Lead Developer"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
            />
            {errors.position && (
              <span className="text-red-500 text-sm">Este campo es requerido</span>
            )}
          </div>

          {/* Skills */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1 font-semibold">
              Skills
            </label>
            <div className="space-y-2">
              {skillFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input
                    {...register(`experienceSkills.${index}.skill`)}
                    placeholder="Skill"
                    className="input input-bordered flex-1 bg-neutral-90"
                  />
                  <button type="button" onClick={() => removeSkill(index)}
                    className="btn btn-sm bg-neutral-90 border border-neutral-60 text-red-400 hover:text-red-300">
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => appendSkill({ skill: "" })}
                className="btn btn-sm bg-primary-60 text-neutral-0">
                + Add Skills
              </button>
            </div>
          </div>

           {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
            {/* Start Date */}
            <div className="form-control">
              <label className="block text-sm text-neutral-20 mb-1">
                <span className="label-text font-semibold">Fecha de inicio</span>
              </label>
              <input
                {...register("startDate", { required: true })}
                type="date"
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
              />
              {errors.startDate && (
                <span className="text-red-500 text-sm">Este campo es requerido</span>
              )}
            </div>

            {/* End Date */}
            <div className="form-control">
              <label className="block text-sm text-neutral-20 mb-1">
                <span className="label-text font-semibold">Fecha de finalización</span>
              </label>
              <input
                {...register("endDate")}
                type="date"
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
              />
            </div>
          </div>

          {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="submit"
            className="btn bg-primary-60 text-neutral-0 hover:bg-primary-50 border border-primary-50"
          >
            {experience ? "Save Experience" : "Publish Experience"}
          </button>
          <button
            type="button"
            className="btn bg-neutral-90 border border-neutral-70 text-neutral-0 hover:text-primary-40"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}
