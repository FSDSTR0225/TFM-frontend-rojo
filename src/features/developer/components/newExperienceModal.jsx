import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const NewExperienceModal = ({ onSubmitExperience, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      position: '',
      company: '',
      startDate: '',
      endDate: '',
    }
  });

  useEffect(() => {
    reset();
  }, [reset]);

  const onSubmit = (data) => {
    onSubmitExperience(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="modal-box bg-base-200 p-6 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Añadir nueva experiencia</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* position */}
          <div>
            <label className="block font-semibold mb-1">Position</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. Frontend Developer"
              {...register('position', { required: true })}
            />
            {errors.professionalPosition && <span className="text-red-500 text-sm">Campo obligatorio</span>}
          </div>

          {/* Company */}
          <div>
            <label className="block font-semibold mb-1">Company</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. Google"
              {...register('company', { required: true })}
            />
            {errors.company && <span className="text-red-500 text-sm">Campo obligatorio</span>}
          </div>

          {/* startDate */}
          <div>
            <label className="block font-semibold mb-1">Start Date</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. 2022"
              {...register('startDate', { required: true })}
            />
            {errors.year && <span className="text-red-500 text-sm">Campo obligatorio</span>}
          </div>

          {/* endDate */}
          <div>
            <label className="block font-semibold mb-1">End Date</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. 2024"
              {...register('endDate', { required: true })}
            />
            {errors.year && <span className="text-red-500 text-sm">Campo obligatorio</span>}
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" className="btn" onClick={handleClose}>
              Close
            </button>
            <button type="submit" className="btn bg-green-500 hover:bg-green-600 text-white">
              New Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewExperienceModal;