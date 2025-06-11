import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function StudyModal({ open, setOpen, handleStudy, study = null }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

useEffect(() => {
  if (open) {
    if (study) {
      reset({
        degree: study.degree || "",
        instituteLogo: study.instituteLogo || "",
        instituteName: study.instituteName || "",
        description: study.description || "",
        startDate: study.startDate ? study.startDate.split("T")[0] : "",
        endDate: study.endDate ? study.endDate.split("T")[0] : "",
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
  }
}, [study, open, reset]);


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
              {...register("description")}
              placeholder="Breve descripción del estudio realizado"
              className="textarea textarea-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
              rows={3}
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

          {/* Botones */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="submit"
            className="btn bg-primary-60 text-neutral-0 hover:bg-primary-50 border border-primary-50"
          >
            {study ? "Save Study" : "Publish Study"}
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
