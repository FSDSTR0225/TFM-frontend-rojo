import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { updateProfile } from "../../../services/profileService";
import { TagsInputDev } from "./TagsInputDev";
import { AvatarUpload } from "./AvatarUpload";
import { ResumeUpload } from "./PdfUpload";

export default function DevModal({
  open,
  setOpen,
  token,
  profileData,
  onProfileUpdate,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const skills = watch("role.developer.skills") || [];

  // Estado para manejar los datos del avatar
  const [avatarData, setAvatarData] = useState({
    imageFile: null,
    avatarUrl: "",
  });
  const [isAvatarValid, setIsAvatarValid] = useState(false);

    // Estado para manejar los datos del curriculum
  const [resumeData, setResumeData] = useState({
    imageFile: null,
    resumeUrl: "",
  });


  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: "role.developer.languages",
  });

  useEffect(() => {
    if (profileData) {
      // Inicializar el estado del avatar
      setAvatarData({
        imageFile: null,
        avatarUrl: profileData.avatar || "",
      });
      setIsAvatarValid(!!profileData.avatar);

      // Inicializar el estado del curriculum
      setResumeData({
        pdfFile: null,
        resumeUrl: profileData.resume || "",
      });

      reset({
        avatar: profileData.avatar || "",
        name: profileData.name || "",
        surname: profileData.surname || "",
        description: profileData.description || "",
        email: profileData.email || "",
        _id: profileData._id || "",
        role: {
          developer: {
            professionalPosition: profileData.role?.developer?.professionalPosition || "",
            resume: profileData.role?.developer?.resume || "",
            experienceYears: profileData.role?.developer?.experienceYears || "",
            location: profileData.role?.developer?.location || "",
            github: profileData.role?.developer?.github || "",
            linkedin: profileData.role?.developer?.linkedin || "",
            languages: profileData.role?.developer?.languages || [
              { language: "", languageLevel: "" },
            ],
            skills: profileData.role?.developer?.skills || [],
          },
        },
      });
    } else {
      setAvatarData({
        imageFile: null,
        avatarUrl: "",
      });
      setIsAvatarValid(false);

      setResumeData({
        pdfFile: null,
        resumeUrl: "",
      });
      

      reset({
        avatar: "",
        name: "",
        surname: "",
        description: "",
        role: {
          developer: {
            professionalPosition: "",
            resume: "",
            experienceYears: "",
            location: "",
            github: "",
            linkedin: "",
            languages: [{ language: "", languageLevel: "" }],
            skills: [{ skill: "" }],
          },
        },
      });
    }
  }, [profileData, reset]);

  // Actualizar el campo avatar del formulario cuando cambie avatarData
  useEffect(() => {
    const avatarValue = avatarData.avatarUrl || "";
    setValue("avatar", avatarValue, { shouldValidate: true });
  }, [avatarData, setValue]);

  // Actualizar el campo avatar del formulario cuando cambie resumeData
  useEffect(() => {
    const resumeValue = resumeData.resumeUrl || "";
    setValue("role.developer.resume", resumeValue, { shouldValidate: true });
  }, [resumeData, setValue]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...profileData,
        ...data,
        avatar: avatarData.avatarUrl || profileData.avatar || "",
        role: {
          developer: {
            ...data.role.developer,
            resume: resumeData.resumeUrl || data.role.developer.resume || "",
            languages: data.role.developer.languages.filter(
              (lang) =>
                lang.language.trim() !== "" && lang.languageLevel.trim() !== ""
            ),
            skills: data.role.developer.skills
              .map((s) => s.trim())
              .filter((skill) => skill !== ""),
          },
        },
      };

      const updated = await updateProfile(formattedData, token);
      if (updated?.user) {
        onProfileUpdate?.(updated.user);
        reset();
        setAvatarData({ imageFile: null, avatarUrl: "" });
        setIsAvatarValid(false);
        setResumeData({ pdfFile: null, resumeUrl: "" });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  const handleClose = () => {
    reset();
    setAvatarData({ imageFile: null, avatarUrl: "" });
    setIsAvatarValid(false);
    setResumeData({ pdfFile: null, resumeUrl: "" });
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="modal modal-open fixed inset-0 flex justify-center items-center z-50">
      <div className="modal-box max-w-3xl bg-neutral-80 border border-neutral-70 rounded-lg p-6 relative">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center">Edit Dev Profile</h2>

          {/* Avatar con drag and drop */}
          <AvatarUpload
            data={avatarData}
            onDataChange={setAvatarData}
            onValidChange={setIsAvatarValid}
            error={errors.avatar?.message}
          />
          {/* Avatar */}
          {/* <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Avatar</span>
            </label>
            <input 
              {...register("avatar")} 
              placeholder="Avatar URL" 
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic" 
            />
          </div> */}

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
              <span className="label-text font-semibold">
                Professional Position
              </span>
            </label>
            <input
              {...register("role.developer.professionalPosition")}
              placeholder="Puesto profesional"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
            />
          </div>

          {/* Resume Upload */}
          <ResumeUpload
            data={resumeData}
            onDataChange={setResumeData}
            error={errors.role?.developer?.resume?.message}
          />

          {/* Location */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Location</span>
            </label>
            <input
              {...register("role.developer.location")}
              placeholder="Location"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
            />
          </div>

          {/* Languages */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Languages</span>
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
                    {...register(
                      `role.developer.languages.${index}.languageLevel`
                    )}
                    placeholder="Language Level"
                    className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 flex-1 placeholder-neutral-40 placeholder:italic"
                  />
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="btn btn-sm bg-neutral-90 border border-neutral-60 text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  appendLanguage({ language: "", languageLevel: "" })
                }
                className="btn btn-sm bg-neutral-70 text-neutral-0 hover:bg-neutral-60 border-neutral-60"
              >
                + Add Language
              </button>
            </div>
          </div>

          {/* Skills */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1 font-semibold">
              Skills
            </label>
            <TagsInputDev
              value={skills}
              onChange={(tags) =>
                setValue("role.developer.skills", tags, {
                  shouldValidate: true,
                })
              }
            />
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
              {...register("description", {
                maxLength: {
                  value: 500,
                  message: "Máximo 500 caracteres",
                },
              })}
              placeholder="Text a description about you..."
              className="textarea textarea-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
              rows={3}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="btn bg-neutral-70 hover:bg-neutral-60 border border-neutral-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !isAvatarValid}
              className="btn bg-primary-60 hover:bg-primary-70"
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
