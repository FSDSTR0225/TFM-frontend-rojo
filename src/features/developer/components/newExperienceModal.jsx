import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TagsInputDev } from './TagsInputDev';

export default function NewExperienceModal({ open, setOpen, handleExperience, experience = null }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    if (startDate && endDate && endDate < startDate) {
      setValue("endDate", startDate);
    }
  }, [startDate, endDate, setValue]);
  const skills = watch("experienceSkills") || [];

  useEffect(() => {
    if (experience) {
      // Función para convertir fecha a formato YYYY-MM
      const formatDateForMonth = (dateString) => {
        if (!dateString) return "";
        // Si ya está en formato YYYY-MM, devolverlo tal como está
        if (dateString.match(/^\d{4}-\d{2}$/)) return dateString;
        // Si está en formato ISO o YYYY-MM-DD, extraer solo año y mes
        return dateString.slice(0, 7);
      };

      reset({
        company: experience.company || "",
        companyLogo: experience.companyLogo || "",
        position: experience.position || "",
        startDate: formatDateForMonth(experience.startDate),
        endDate: formatDateForMonth(experience.endDate),
        experienceSkills: experience.experienceSkills || []
      });
    } else {
      reset({
        company: "",
        companyLogo: "",
        position: "",
        startDate: "",
        endDate: "",
        experienceSkills: []
      });
    }
  }, [experience, reset]);

  const onSubmit = (data) => {
    const formatted = {
      ...data,
      experienceSkills: data.experienceSkills.map(s => s.trim()).filter(Boolean),
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
            <TagsInputDev
              value={skills}
              onChange={(tags) => setValue("experienceSkills", tags, { shouldValidate: true })}
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
            {/* Start Date */}
            <div className="form-control">
              <label className="block text-sm text-neutral-20 mb-1">
                <span className="label-text font-semibold">Fecha de inicio</span>
              </label>
              <input
                {...register("startDate", { 
                  required: "Fecha de inicio requerida",
                })}
                type="month"
                max={new Date().toISOString().slice(0, 7)}
                min="1990-01"
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
              />
              {errors.startDate && (
                <span className="text-red-500 text-sm">{errors.startDate.message}</span>
              )}
            </div>

            {/* End Date */}
            <div className="form-control">
              <label className="block text-sm text-neutral-20 mb-1">
                <span className="label-text font-semibold">Fecha de finalización</span>
              </label>
              <input
                {...register("endDate", {
                  required: "Fecha de finalización requerida",
                  validate: value => {
                    if (!startDate) return true;
                    return value >= startDate || "La fecha final debe ser igual o posterior a la de inicio";
                  }
                })}
                type="month"
                max={new Date().toISOString().slice(0, 7)}
                min={startDate || "1990-01"}
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
              />
              {errors.endDate && (
                <span className="text-red-500 text-sm">{errors.endDate.message}</span>
              )}
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
