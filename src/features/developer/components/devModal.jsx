import { useForm, useFieldArray  } from 'react-hook-form';
import { updateProfile } from '../../../services/profileService';
import { useEffect } from 'react';

export const DevModal = ({token, profileData}) => { // Añadido profileData como prop
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
  defaultValues: {
    avatar: '',
    name: '',
    surname: '',
    description: '',
    role: {
      developer: {
        location: '',
        professionalPosition : '',
        languages: [],
        skills: [{ skill: '' }],
        linkedin: '',
        github: '',
      }
    }
  }
});

  const { fields: languageFields, append: languageAppend, remove: languageRemove } = useFieldArray({
    control,
    name: "role.developer.languages"
  });

    const { fields: skillFields, append: skillAppend, remove: skillRemove } = useFieldArray({
    control,
    name: "role.developer.skills"
  });

  useEffect(() => {
    if (profileData) {
      reset({
        avatar: profileData.avatar || '',
        name: profileData.name || '',
        surname: profileData.surname || '',
        description: profileData.description || '',
        role: {
          developer: {
            languages: profileData.role?.developer?.languages || [],
            skills: profileData.role?.developer?.skills || [],
            location: profileData.role?.developer?.location || '',
            github: profileData.role?.developer?.github || '',
            linkedin: profileData.role?.developer?.linkedin || '',
            professionalPosition: profileData.role?.developer?.professionalPosition || ''
          }
        }
      });
    }
  }, [profileData, reset]); 

  const editDevProfile = async (formData) => {
    const editProfile = await updateProfile({...profileData, ...formData}, token);
    
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
    <div className="modal-box ">
      <div className="modal-action rounded-lg">
        <form method="dialog" onSubmit={handleSubmit(editDevProfile)} className=" mx-auto p-6 rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-8">Edit a dev profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Avatar */}
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Avatar</span></label>
              <input 
                type="text" 
                className="input input-bordered" 
                {...register('avatar')} 
                placeholder="e.g. https://mir-s3-cdn-cf.behance.net/user/115/5713a176531403.591bf1cc1bc28.png" 
              />
            </div>

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

          {/* professionalPosition */}
          <div className="form-control">
            <label className="label"><span className="label-text font-semibold my-2">Professional Position</span></label>
            <textarea 
              type="text" 
              className="input input-bordered flex gap-2 w-full" 
              {...register('role.developer.professionalPosition')} 
              placeholder="e.g. FrontEnd Developer"
            />
          </div>

            {/* Location */}
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Location</span></label>
              <input 
                type="text" 
                className="input input-bordered" 
                {...register('role.developer.location')} 
                placeholder="e.g. Madrid" 
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label"><span className="label-text font-semibold my-2">Description</span></label>
            <textarea 
              type="text" 
              className="input input-bordered flex gap-2 w-full" 
              {...register('description')} 
              placeholder="e.g. En un lugar de la mancha de cuyo nombre no quiero acordarme..." 
            />
          </div>

          {/* GitHub */}
          <div className="form-control">
            <label className="label"><span className="label-text font-semibold my-2">GitHub</span></label>
            <textarea 
              type="text" 
              className="input input-bordered flex gap-2 w-full" 
              {...register('role.developer.github')} 
              placeholder="e.g. https://github.com/example" 
            />
          </div>

          {/* LinkedIn */}
          <div className="form-control">
            <label className="label"><span className="label-text font-semibold my-2">LinkedIn</span></label>
            <textarea 
              type="text" 
              className="input input-bordered flex gap-2 w-full" 
              {...register('role.developer.linkedin')}
              placeholder="e.g. https://www.linkedin.com/in/example"
            />
          </div>

          {/* LANGUAGES */}
            <div className="w-full mt-4">
              <label className="label"><span className="label-text font-semibold mb-1">Languages</span></label>

              {languageFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center mb-2">
                  <input
                    type="text"
                    placeholder="Language (e.g. English)"
                    className="input input-bordered w-1/2"
                    {...register(`role.developer.languages.${index}.language`,
                      { required: "Este campo es obligatorio", 
                        validate: value => value.trim() !== "" || "El idioma no puede estar vacío o contener solo espacios"
                      })}
                    defaultValue={field.language}
                  />
                  <input
                    type="text"
                    placeholder="Level (e.g. Intermediate)"
                    className="input input-bordered w-1/2"
                    {...register(`role.developer.languages.${index}.languageLevel`, 
                      { required: "Este campo es obligatorio", 
                        validate: value => value.trim() !== "" || "El idioma no puede estar vacío o contener solo espacios"
                      })}
                    defaultValue={field.languageLevel}
                  />
                  <button
                    type="button"
                    onClick={() => languageRemove(index)}
                    className="btn btn-error btn-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => languageAppend({ language: "", languageLevel: "" })}
                className="btn btn-primary btn-sm mt-2"
              >
                Add Language
              </button>

              <span hidden = {languageFields.length !== 0} className="flex gap-2 items-center mb-2">No hay Idiomas</span>
            </div>

            {/* SKILLS */}
            <div className="w-full mt-4">
              <label className="label"><span className="label-text font-semibold mb-1">Skills</span></label>

              {skillFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center mb-2">
                  <input
                    type="text"
                    placeholder="Skill (e.g. React)"
                    className="input input-bordered w-1/2"
                    {...register(`role.developer.skills.${index}`,
                      { required: "Este campo es obligatorio",
                        validate: value => value.trim() !== "" || "Skill no puede estar vacío o contener solo espacios"
                      })}
                    defaultValue={field}
                  />
                  <button
                    type="button"
                    onClick={() => skillRemove(index)}
                    className="btn btn-error btn-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => skillAppend({ skill: "" })}
                className="btn btn-primary btn-sm mt-2"
              >
                Add Skill
              </button>

              <span hidden = {skillFields.length !== 0} className="flex gap-2 items-center mb-2">No hay Skills</span>
            </div>
          
          {/* Buttons */}
          <div className="form-control mt-8 flex justify-between">
            <button 
              className="btn bg-transparent border-2 border-primary-50 text-primary-50  hover:bg-neutral-0 hover:text-neutral-90 hover:border-neutral-0"
              onClick={handleClose} 
              type="button"
            >
              Close
            </button>
            <button 
              type="submit" 
              className="btn bg-primary-60 text-neutral-0 hover:bg-primary-50 border border-primary-50"
            >
              Edit Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}