import { useForm } from 'react-hook-form';
import { createdOffert } from '../../../services/offersServices';

export const OfferModal = () => {
  const { register,
    watch,
    handleSubmit,
    reset,
    formState: { errors } } = useForm();

  const createNewOffer = async (formDatos) => {
    const respOffert = await createdOffert(formDatos);
    console.log('nueva oferta: ', respOffert);
    reset();
    document.getElementById("my_modal_1")?.close();
  }

  const handleClose = () => {
    reset(); // Limpiar formulario sin enviar
    document.getElementById("my_modal_1")?.close();
  };


  return (
    <div className="modal-box">
      <div className="modal-action">
        <form method="dialog" onSubmit={handleSubmit(createNewOffer)} className="max-w-3xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Post a Job Offer</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Position */}
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Position</span></label>
              <input type="text" name="position" className="input input-bordered" {...register('position')} placeholder="e.g. Web Developer" />
            </div>

            {/* Role */}
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Role</span></label>
              <input type="text" name="role" className="input input-bordered" {...register('role')} placeholder="e.g. Backend, Frontend..." />
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Location</span></label>
              <input type="text" name="location" className="input input-bordered" {...register('location')} placeholder="e.g. Remote, New York..." />
            </div>

            {/* Contract Type */}
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Contract Type</span></label>
              <select name="contractType" {...register('contractType')} className="select select-bordered">
                <option disabled selected>Select one</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Freelance</option>
                <option>Temporary</option>
                <option>Internship</option>
              </select>
            </div>

            {/* Company */}
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Company</span></label>
              <input type="text" name="company" {...register('company')} className="input input-bordered" placeholder="Company name" />
            </div>

            {/* Salary */}
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Salary (€)</span></label>
              <input type="number" name="salary" {...register('salary')} className="input input-bordered" placeholder="e.g. 30000" />
            </div>

            {/* Skills */}
            <div className="form-control w-full mb-4">
              <label className="label"><span className="label-text font-semibold">Skills</span></label>
              <input
                type="text"
                {...register('skills')}
                name="skills"
                className="input input-bordered focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. JavaScript, Node.js, MongoDB"
              />
            </div>

            {/* Language */}
            <div className="form-control w-full mb-4">
              <label className="label"><span className="label-text font-semibold">Language</span></label>
              <input
                type="text"
                name="language"
                {...register('language')}
                className="input input-bordered focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. English, Spanish"
              />
            </div>

            {/* Description */}
            <div className="form-control w-full mb-4">
              <label className="label"><span className="label-text font-semibold">Description</span></label>
              <textarea
                name="description"
                {...register('description')}
                className="textarea textarea-bordered focus:ring-2 focus:ring-blue-500 w-[400px] h-32"  // Usando un ancho específico
                placeholder="Describe the position..."
              ></textarea>
            </div>

          </div>
          {/* Buttons */}
          <div className="form-control mt-8 flex justify-between">
            <button className="w-full md:w-auto text-lg bg-green-600 text-black hover:bg-green-700 transition-colors px-4 py-2 rounded">Created Offer</button>
            <button className="btn w-full md:w-auto text-lg" onClick={handleClose} type="button"> Close </button>
          </div>
        </form>
      </div>
    </div>
  )
}
