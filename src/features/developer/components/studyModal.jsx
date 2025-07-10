import { useEffect, useState, } from "react";
import { useForm } from "react-hook-form";
import { StudyLogoUpload } from "./StudyLogoUpload"

export default function StudyModal({ open, setOpen, handleStudy, study = null }) {
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
      if (study) {

        setLogoData({
          imageFile: null,
          logoUrl: study.instituteLogo || "",
        });

        // Función para convertir fecha a formato YYYY-MM
        const formatDateForMonth = (dateString) => {
          if (!dateString) return "";
          
          // Convertir a string si es un objeto Date
          const dateStr = dateString.toString();
          
          // Si ya está en formato YYYY-MM, devolverlo tal como está
          if (dateStr.match(/^\d{4}-\d{2}$/)) return dateStr;
          
          // Si está en formato ISO o YYYY-MM-DD, extraer solo año y mes
          return dateStr.slice(0, 7);
        };

        reset({
          degree: study.degree || "",
          instituteLogo: study.instituteLogo || "",
          instituteName: study.instituteName || "",
          description: study.description || "",
          startDate: formatDateForMonth(study.startDate),
          endDate: formatDateForMonth(study.endDate),
        });
      } else {

        // Resetear estado del logo
        setLogoData({
          imageFile: null,
          logoUrl: "",
        });
        reset({
          degree: "",
          instituteLogo: "",
          instituteName: "",
          description: "",
          startDate: "",
          endDate: "",
        });
      }
  }, [study, reset]);

  // Actualizar el campo instituteLogo del formulario cuando cambie logoData
  useEffect(() => {
    const logoValue = logoData.logoUrl || "";
    setValue("instituteLogo", logoValue, { shouldValidate: true });
  }, [logoData, setValue]);


  const onSubmit = (data) => {
    handleStudy(data, study?._id);
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
            {study ? "Edit Study" : "New study"}
          </h2>

          {/* Degree */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Title or degree</span>
            </label>
            <input
              {...register("degree", { required: true })}
              placeholder="E.g: Computer Engineering"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
            />
            {errors.degree && (
              <span className="text-red-500 text-sm">This field is required</span>
            )}
          </div>

          {/* Logo Upload con drag and drop */}
          <StudyLogoUpload
            data={logoData}
            onDataChange={setLogoData}
            error={errors.instituteLogo?.message}
          />


          {/* Institute */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Institute</span>
            </label>
            <input
              {...register("instituteName", { required: true })}
              placeholder="Institute Name"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
            />
            {errors.instituteName && (
              <span className="text-red-500 text-sm">This field is required</span>
            )}
          </div>

          {/* Description */}
          {/* <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea
              {...register("description", { maxLength: { value: 200, message: "Max 200 caracters" } })}
              placeholder="Breve descripción del estudio realizado"
              className="textarea textarea-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
              rows={3}
            />
            {errors.description && (
              <span className="text-red-500 text-sm" role="alert">
                {errors.description.message}
              </span>
            )}
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

          {/* Botones */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4">
          <button
            type="submit"
            className="btn bg-primary-60 hover:bg-primary-70"
          >
            {study ? "Save Study" : "Publish Study"}
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
