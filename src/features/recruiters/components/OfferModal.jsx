import { useForm } from 'react-hook-form';
import { createdOffert } from '../../../services/offersServices';
import { TagsInputRecruiter } from './TagsInputRecruiter';

export const OfferModal = ({ token, reloadPage }) => {
  const { register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors } } = useForm();

  const skills = watch("skills") || [];

  const createNewOffer = async (formDatos) => {
    const respOffert = await createdOffert(formDatos, token);
    console.log('nueva oferta: ', respOffert);
    reloadPage();
    reset();
    document.getElementById("my_modal_1")?.close();
  }

  const handleClose = () => {
    reset(); // Limpiar formulario sin enviar
    document.getElementById("my_modal_1")?.close();
  };

  return (
    // Overlay y centrar modal
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Caja del modal centrada */}
      <div className="modal-box max-w-3xl w-full bg-neutral-80 border border-neutral-70 text-neutral-0 shadow-md rounded-lg">
        <form
          method="dialog"
          onSubmit={handleSubmit(createNewOffer)}
          className="space-y-6 p-6"
        >
          <h2 className="text-3xl font-bold text-center mb-4">Post a Job Offer</h2>
          <hr className="border-t border-neutral-60" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Position */}
            <div>
              <label className="block text-sm text-neutral-20 mb-1">Position</label>
              <input
                type="text"
                {...register("position")}
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                placeholder="e.g. Web Developer"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm text-neutral-20 mb-1">Role</label>
              <input
                type="text"
                {...register("role")}
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                placeholder="e.g. Frontend"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm text-neutral-20 mb-1">Location</label>
              <input
                type="text"
                {...register("location")}
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                placeholder="e.g. Remote"
              />
            </div>

            {/* Contract Type */}
            <div>
              <label className="block text-sm text-neutral-20 mb-1">Contract Type</label>
              <select
                {...register("contractType")}
                className="select select-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full"
              >
                <option disabled selected>Select one</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Freelance</option>
                <option>Temporary</option>
                <option>Internship</option>
              </select>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm text-neutral-20 mb-1">Company</label>
              <input
                type="text"
                {...register("company")}
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                placeholder="Company name"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm text-neutral-20 mb-1">Salary (€)</label>
              <input
                type="number"
                {...register("salary")}
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                placeholder="e.g. 30000"
              />
            </div>

            {/* Skills */}
            <div className="md:col-span-2">
              <label className="block text-sm text-neutral-20 mb-1">Skills</label>
              <TagsInputRecruiter
                value={skills}
                onChange={(tags) =>
                  setValue("skills", tags, { shouldValidate: true })
                }
              />
            </div>

            {/* Language */}
            <div className="md:col-span-2">
              <label className="block text-sm text-neutral-20 mb-1">Language</label>
              <input
                type="text"
                {...register("language")}
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                placeholder="e.g. English, Spanish"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm text-neutral-20 mb-1">Description</label>
              <textarea
                {...register("description")}
                className="textarea textarea-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full h-32 placeholder-neutral-40 placeholder:italic"
                placeholder="Describe the position..."
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 pt-4">
            <button
              type="submit"
              className="btn bg-primary-60 text-neutral-90 hover:bg-primary-70 w-full md:w-auto"
            >
              Create Offer
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="btn bg-neutral-70 text-neutral-10 hover:bg-neutral-60 border border-neutral-60 w-full md:w-auto"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
