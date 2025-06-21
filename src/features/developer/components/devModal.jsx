import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { updateProfile } from "../../../services/profileService";

export default function DevModal({ open, setOpen, token, profileData, onProfileUpdate }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting }
  } = useForm();

  const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
    control,
    name: "role.developer.languages"
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: "role.developer.skills"
  });

  useEffect(() => {
    if (profileData) {
      reset({
        avatar: profileData.avatar || "",
        name: profileData.name || "",
        surname: profileData.surname || "",
        description: profileData.description || "",
        role: {
          developer: {
            professionalPosition: profileData.role?.developer?.professionalPosition || "",
            experienceYears: profileData.role?.developer?.experienceYears || "",
            location: profileData.role?.developer?.location || "",
            github: profileData.role?.developer?.github || "",
            linkedin: profileData.role?.developer?.linkedin || "",
            languages: profileData.role?.developer?.languages || [{ language: "", languageLevel: "" }],
            skills: profileData.role?.developer?.skills?.map(skill => ({ skill })) || [{ skill: "" }]
          }
        }
      });
    } else {
      reset({
        avatar: "",
        name: "",
        surname: "",
        description: "",
        role: {
          developer: {
            professionalPosition: "",
            experienceYears: "",
            location: "",
            github: "",
            linkedin: "",
            languages: [{ language: "", languageLevel: "" }],
            skills: [{ skill: "" }]
          }
        }
      });
    }
  }, [profileData, reset]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...profileData,
        ...data,
        role: {
          developer: {
            ...data.role.developer,
            languages: data.role.developer.languages.filter(lang =>
              lang.language.trim() !== "" && lang.languageLevel.trim() !== ""
            ),
            skills: data.role.developer.skills
              .map(s => s.skill.trim())
              .filter(skill => skill !== "")
          }
        }
      };

      const updated = await updateProfile(formattedData, token);
      if (updated?.user) {
        onProfileUpdate?.(updated.user);
        reset();
        setOpen(false);
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="modal modal-open fixed inset-0 flex justify-center items-center z-50">
      <div className="modal-box max-w-3xl bg-neutral-80 border border-neutral-70 rounded-lg p-6 relative">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center">Edit Dev Profile</h2>

          {/* Avatar */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Avatar</span>
            </label>
            <input 
              {...register("avatar")} 
              placeholder="Avatar URL" 
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic" 
            />
          </div>

          {/* Name y Surname */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="block text-sm text-neutral-20 mb-1">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input 
                {...register("name")} 
                placeholder="Name" 
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic" 
              />
            </div>
            <div className="form-control">
              <label className="block text-sm text-neutral-20 mb-1">
                <span className="label-text font-semibold">Surname</span>
              </label>
              <input 
                {...register("surname")} 
                placeholder="Surname" 
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic" 
              />
            </div>
          </div>

          {/* Professional Position */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Professional Position</span>
            </label>
            <input 
              {...register("role.developer.professionalPosition")} 
              placeholder="Puesto profesional" 
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic" 
            />
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Location</span>
            </label>
            <input 
              {...register("role.developer.location")} 
              placeholder="Ubication" 
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic" 
            />
          </div>

          {/* Languages */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Idiomas</span>
            </label>
            <div className="space-y-2">
              {languageFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input 
                    {...register(`role.developer.languages.${index}.language`)} 
                    placeholder="Language" 
                    className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 flex-1 placeholder-neutral-40 placeholder:italic" 
                  />
                  <input 
                    {...register(`role.developer.languages.${index}.languageLevel`)} 
                    placeholder="Language Level" 
                    className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 flex-1 placeholder-neutral-40 placeholder:italic" 
                  />
                  <button 
                    type="button" 
                    onClick={() => removeLanguage(index)} 
                    className="btn btn-sm bg-neutral-90 border border-neutral-60 text-red-400 hover:text-red-300"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => appendLanguage({ language: "", languageLevel: "" })} 
                className="btn btn-sm bg-neutral-70 text-neutral-0 hover:bg-neutral-60 border-neutral-60"
              >
                + Añadir idioma
              </button>
            </div>
          </div>

          {/* Skills */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Habilidades</span>
            </label>
            <div className="space-y-2">
              {skillFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input 
                    {...register(`role.developer.skills.${index}.skill`)} 
                    placeholder="Skill" 
                    className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 flex-1 placeholder-neutral-40 placeholder:italic" 
                  />
                  <button 
                    type="button" 
                    onClick={() => removeSkill(index)} 
                    className="btn btn-sm bg-neutral-90 border border-neutral-60 text-red-400 hover:text-red-300"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => appendSkill({ skill: "" })} 
                className="btn btn-sm bg-neutral-70 text-neutral-0 hover:bg-neutral-60 border-neutral-60"
              >
                + Añadir habilidad
              </button>
            </div>
          </div>

          {/* GitHub & LinkedIn */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="block text-sm text-neutral-20 mb-1">
                <span className="label-text font-semibold">Github</span>
              </label>
              <input 
                {...register("role.developer.github")} 
                placeholder="GitHub URL" 
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic" 
              />
            </div>
            <div className="form-control">
              <label className="block text-sm text-neutral-20 mb-1">
                <span className="label-text font-semibold">Linkedin</span>
              </label>
              <input 
                {...register("role.developer.linkedin")} 
                placeholder="LinkedIn URL" 
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic" 
              />
            </div>
          </div>

          {/* About Me */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">About Me</span>
            </label>
            <textarea 
              {...register("description")} 
              placeholder="Text a description about you..." 
              className="textarea textarea-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic" 
              rows={3}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="btn bg-primary-60 text-neutral-0 hover:bg-primary-50 border border-primary-50"
            >
              {isSubmitting ? "Guardando..." : "Edit Dev Profile"}
            </button>
            <button 
              type="button" 
              onClick={handleClose} 
              className="btn bg-neutral-90 border border-neutral-70 text-neutral-0 hover:text-primary-40"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}