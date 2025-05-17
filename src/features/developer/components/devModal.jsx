import { useForm } from 'react-hook-form';
import { updateProfile } from '../../../services/profileService';
import { useEffect } from 'react';

export const DevModal = ({token, profileData}) => { // Añadido profileData como prop
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (profileData) {
      setValue('name', profileData.name);
      setValue('surname', profileData.surname);
    }
  }, [profileData, setValue]);

  const editDevProfile = async (formData) => {
    const editProfile = await updateProfile({...profileData, ...formData}, token);
    console.log('Datos del perfil actualizados: ', editProfile);
    
    if (editProfile?.user) {
      reset();
      document.getElementById("my_modal_1")?.close();
      window.location.reload();
    }

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
        <form method="dialog" onSubmit={handleSubmit(editDevProfile)} className="max-w-3xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Edit a dev profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Name</span></label>
              <input 
                type="text" 
                className="input input-bordered" 
                {...register('name')} 
                placeholder="e.g. Juan" 
              />
            </div>

            {/* Surname */}
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Surname</span></label>
              <input 
                type="text" 
                className="input input-bordered" 
                {...register('surname')} 
                placeholder="e.g. Martinez" 
              />
            </div>
          </div>
          
          {/* Buttons */}
          <div className="form-control mt-8 flex justify-between">
            <button 
              className="btn w-full md:w-auto text-lg" 
              onClick={handleClose} 
              type="button"
            >
              Close
            </button>
            <button 
              type="submit" 
              className="btn w-full md:w-auto text-lg bg-green-600 text-black hover:bg-green-700 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}