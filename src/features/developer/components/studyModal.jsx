import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function StudyModal({ open, setOpen, handleStudy, study = null }) {
  const {
    register,
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

  useEffect(() => {
      if (study) {
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
            {study ? "Editar estudio" : "Nuevo estudio"}
          </h2>

          {/* Degree */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Título o Grado</span>
            </label>
            <input
              {...register("degree", { required: true })}
              placeholder="Ej. Ingeniería Informática"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
            />
            {errors.degree && (
              <span className="text-red-500 text-sm">Este campo es requerido</span>
            )}
          </div>

          {/* instituteLogo */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Logo</span>
            </label>
            <input
              {...register("instituteLogo")}
              placeholder="Logo de la universidad o centro"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
            />
          </div>


          {/* Institute */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Institución</span>
            </label>
            <input
              {...register("instituteName", { required: true })}
              placeholder="Nombre de la universidad o centro"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
            />
            {errors.instituteName && (
              <span className="text-red-500 text-sm">Este campo es requerido</span>
            )}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Descripción</span>
            </label>
            <textarea
              {...register("description", { maxLength: { value: 200, message: "Máximo 200 caracteres" } })}
              placeholder="Breve descripción del estudio realizado"
              className="textarea textarea-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
              rows={3}
            />
            {errors.description && (
              <span className="text-red-500 text-sm" role="alert">
                {errors.description.message}
              </span>
            )}
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

          {/* Botones */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="submit"
            className="btn bg-primary-60 text-neutral-10 hover:bg-primary-70 w-full md:w-auto"
          >
            {study ? "Save Study" : "Publish Study"}
          </button>
          <button
            type="button"
            className="btn bg-neutral-70 text-neutral-10 hover:bg-neutral-60 border border-neutral-60 w-full md:w-auto"
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
