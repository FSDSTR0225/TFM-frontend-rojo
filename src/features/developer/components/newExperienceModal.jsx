import { useEffect, useState, } from "react";
import { useForm } from 'react-hook-form';
import { TagsInputDev } from './TagsInputDev';
import { ExperienceLogoUpload } from "./ExperienceLogoUpload"


export default function NewExperienceModal({ open, setOpen, handleExperience, experience = null }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [logoData, setLogoData] = useState({
    imageFile: null,
    logoUrl: "",
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    if (startDate && endDate && endDate < startDate) {
      setValue("endDate", startDate);
    }
  }, [startDate, endDate, setValue]);

  useEffect(() => {
    if (experience) {

      setLogoData({
        imageFile: null,
        logoUrl: experience.companyLogo || "",
      });
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

      // Resetear estado del logo
      setLogoData({
        imageFile: null,
        logoUrl: "",
      });

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

  // Actualizar el campo companyLogo del formulario cuando cambie logoData
  useEffect(() => {
    const logoValue = logoData.logoUrl || "";
    setValue("companyLogo", logoValue, { shouldValidate: true });
  }, [logoData, setValue]);

  const onSubmit = (data) => {
    const formatted = {
      ...data,
      companyLogo: logoData.logoUrl || "",
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
            {experience ? "Edit experience" : "New Experience"}
          </h2>

          {/* Company */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Company</span>
            </label>
            <input
              {...register("company", { required: true })}
              placeholder="e.g Google"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
            />
            {errors.company && (
              <span className="text-red-500 text-sm">This field is required</span>
            )}
          </div>

          {/* Position */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Position</span>
            </label>
            <input
              {...register("position", { required: true })}
              placeholder="E.g Lead Developer"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
            />
            {errors.position && (
              <span className="text-red-500 text-sm">This field is required</span>
            )}
          </div>

          {/* Logo Upload con drag and drop */}
          <ExperienceLogoUpload
            data={logoData}
            onDataChange={setLogoData}
            error={errors.companyLogo?.message}
          />

          {/* Skills */}
          {/* <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1 font-semibold">
              Skills
            </label>
            <TagsInputDev
              value={skills}
              onChange={(tags) => setValue("experienceSkills", tags, { shouldValidate: true })}
            />
          </div> */}

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
            {/* Start Date */}
            <div className="form-control">
              <label className="block text-sm text-neutral-20 mb-1">
                <span className="label-text font-semibold">Start Date</span>
              </label>
              <input
                {...register("startDate", { 
                  required: "Start Date is required",
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
                <span className="label-text font-semibold">End Date</span>
              </label>
              <input
                {...register("endDate", {
                  required: "End Date is required",
                  validate: value => {
                    if (!startDate) return true;
                    return value >= startDate || "The end date must be equal to or later than the start date";
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
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4">
          <button
            type="submit"
            className="btn bg-primary-60 hover:bg-primary-70"
          >
            {experience ? "Save Experience" : "Publish Experience"}
          </button>
          <button
            type="button"
            className="btn bg-neutral-70 hover:bg-neutral-60 border border-neutral-60"
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
