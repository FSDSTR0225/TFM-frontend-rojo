import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { PiTrash, PiImages, PiCodeBlock, PiFile } from "react-icons/pi";
import { CategorySelect } from "../components/CategorySelect";
import { TagsInputDev } from "../components/TagsInputDev";
import { AvatarUpload } from "../components/AvatarUpload";

export const NewProjectModal = ({
  project = null,
  onClose,
  onSubmitProject,
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ mode: "onChange" });

  const [codeSections, setCodeSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Gallery slots max 5
  const [gallerySlots, setGallerySlots] = useState([
    { avatarUrl: null, imageFile: null },
  ]);

  const skills = watch("projectSkills") || [];
  const currentYear = new Date().getFullYear();

  const onSlotChange = (index, data) => {
    setGallerySlots((prev) => {
      const updated = [...prev];
      updated[index] = data;

      const hasEmpty = updated.some((s) => !s.avatarUrl);
      if (!hasEmpty && updated.length < 5) {
        updated.push({ avatarUrl: null, imageFile: null });
      }

      const filtered = [];
      let emptyCount = 0;
      for (const slot of updated) {
        if (!slot.avatarUrl) {
          emptyCount++;
          if (emptyCount > 1) continue;
        }
        filtered.push(slot);
      }

      return filtered.slice(0, 5);
    });
  };

  const onSlotRemove = (index) => {
    setGallerySlots((prev) => {
      const updated = [...prev];
      updated[index] = { avatarUrl: null, imageFile: null };

      const hasEmpty = updated.some((s) => !s.avatarUrl);
      if (!hasEmpty) {
        updated.push({ avatarUrl: null, imageFile: null });
      }

      const filtered = [];
      let emptyCount = 0;
      for (const slot of updated) {
        if (!slot.avatarUrl) {
          emptyCount++;
          if (emptyCount > 1) continue;
        }
        filtered.push(slot);
      }

      return filtered.slice(0, 5);
    });
  };

  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        year: project.year,
        professionalRole: project.professionalRole,
        duration: project.duration,
        projectSkills: project.projectSkills || [],
        category: project.category,
        description: project.description,
        liveLink: project.liveLink,
        githubProjectLink: project.githubProjectLink,
      });

      setCodeSections(project.codeSections || []);
      setGallerySlots(
        (project.gallery || []).map((url) => ({
          avatarUrl: url,
          imageFile: null,
        }))
      );
    } else {
      reset(); // Limpia el formulario si no hay proyecto
      setCodeSections([]);
      setGallerySlots([{ avatarUrl: null, imageFile: null }]);
    }
  }, [project, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    const filteredGallery = gallerySlots
      .map((item) => item.avatarUrl?.trim())
      .filter((url) => !!url);

    const payload = {
      ...data,
      codeSections,
      gallery: filteredGallery,
    };

    console.log("Payload enviado al backend:", payload); // <--- Aquí el console.log

    if (!onSubmitProject) {
      setError("No submit handler provided");
      setLoading(false);
      return;
    }

    try {
      await onSubmitProject(payload);

      reset();
      setCodeSections([]);
      setGallerySlots([{ avatarUrl: null, imageFile: null }]);
      onClose();

      if (!project) {
        navigate(`/projects/${payload._id || ""}`);
      }
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Slots galería arriba (solo slots, sin AvatarUpload)
  const GallerySlots = () => (
    <div className="flex gap-2 overflow-x-auto pb-2 max-w-full">
      {gallerySlots
        .filter((slot) => slot.avatarUrl)
        .map((slot, i) => (
          <div
            key={i}
            className="relative w-30 h-30 border border-neutral-600 rounded-lg bg-neutral-900 flex justify-center items-center overflow-hidden flex-shrink-0"
          >
            <img
              src={slot.avatarUrl}
              alt={`Imagen ${i + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => onSlotRemove(i)}
              className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full w-6 h-6 flex justify-center items-center text-white cursor-pointer"
              title="Eliminar imagen"
              type="button"
            >
              <PiTrash size={16} />
            </button>
          </div>
        ))}
    </div>
  );

  // Componente para añadir nueva imagen debajo, con tamaño fijo
  const AddImage = () => {
    const emptyIndex = gallerySlots.findIndex((s) => !s.avatarUrl);
    if (emptyIndex === -1) return null;

    return (
      <div>
        <AvatarUpload
          data={gallerySlots[emptyIndex]}
          onDataChange={(data) => onSlotChange(emptyIndex, data)}
          onValidChange={() => {}}
          style={{ width: 120, height: 120 }}
          showTitle={false}
        />
      </div>
    );
  };

  return (
    <dialog id="project_modal" className="modal modal-open">
      <div className="modal-box max-w-3xl bg-neutral-70 border border-neutral-60 text-neutral-0 shadow-md rounded-lg xl:max-h-[850px]">
        <h2 className="text-2xl font-bold mb-4">
          {project ? "Edit Project" : "Create New Project"}
        </h2>
        <hr className="border-t border-neutral-55 pt-4 mt-3" />

        {error && <p className="text-red-400 mb-2">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Project Details */}
          <section className="space-y-4 mt-3">
            <header className="flex items-center gap-2 text-primary-50 font-semibold text-lg">
              <PiFile size={20} />
              <h3>Project Details</h3>
            </header>

            <div className="grid grid-cols-[3fr_2fr] gap-4">
              <div>
                <label
                  className="block text-sm text-neutral-20 mb-1"
                  htmlFor="title"
                >
                  Project Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Write your project title..."
                  className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                  {...register("title", { required: true })}
                />
              </div>

              <div>
                <label
                  className="block text-sm text-neutral-20 mb-1"
                  htmlFor="category-select"
                >
                  Category
                </label>
                <CategorySelect
                  id="category"
                  register={register}
                  error={errors.category}
                  setValue={setValue}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className="block text-sm text-neutral-20 mb-1"
                  htmlFor="year"
                >
                  Year of creation
                </label>
                <input
                  id="year"
                  type="number"
                  placeholder="(e.g. 2020)"
                  className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                  {...register("year", {
                    required: "Year is required",
                    min: { value: 1900, message: "Year must be ≥ 1900" },
                    max: {
                      value: currentYear,
                      message: `Year must be ≤ ${currentYear}`,
                    },
                    validate: (value) =>
                      value.toString().length === 4 ||
                      "Year must have exactly 4 digits",
                  })}
                />
                {errors.year && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.year.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm text-neutral-20 mb-1"
                  htmlFor="role"
                >
                  Professional Role
                </label>
                <input
                  id="professionalRole"
                  type="text"
                  placeholder="(e.g. Lead Developer)"
                  className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                  {...register("professionalRole")}
                />
              </div>

              <div>
                <label
                  className="block text-sm text-neutral-20 mb-1"
                  htmlFor="duration"
                >
                  Duration
                </label>
                <input
                  id="duration"
                  type="text"
                  placeholder="(e.g. 3 months)"
                  className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                  {...register("duration")}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm text-neutral-20 mb-1"
                htmlFor="projectSkills"
              >
                Skills
              </label>
              <TagsInputDev
                value={skills}
                onChange={(tags) =>
                  setValue("projectSkills", tags, { shouldValidate: true })
                }
                placeholder="Add skill and press enter"
              />
              {errors.projectSkills && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.projectSkills.message}
                </p>
              )}
            </div>

            <label
              className="block text-sm text-neutral-20 mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Describe your project here..."
              className="textarea textarea-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
              {...register("description")}
            />
            <hr className="border-t border-neutral-55 mt-3" />
          </section>

          {/* Image Gallery Section */}
          <div className="pt-4">
            <div className="text-primary-50">
              <label className="font-semibold flex items-center gap-2 mb-1">
                <PiImages size={20} />
                Upload Images
              </label>
              <p className="text-sm text-neutral-30">
                Upload up to five images. The first will be the project
                thumbnail.
              </p>
            </div>
            <div className="mt-4 mb-2">
              <GallerySlots />
            </div>

            <AddImage />

            <p className="text-sm text-neutral-30 my-2">
              Accepted formats: JPG, PNG, GIF. Max size: 5MB.
            </p>

            <hr className="border-t border-neutral-55 mt-8" />
          </div>

          {/* Code Snippets */}
          <div className="space-y-4 pt-4">
            <label className="flex items-center gap-2 font-semibold text-primary-50">
              <PiCodeBlock size={20} />
              Code Section
            </label>

            {codeSections.map((code, index) => (
              <div key={index} className="flex items-start gap-2">
                <textarea
                  className="textarea textarea-bordered bg-neutral-90 text-white border border-neutral-60 w-full font-mono placeholder-neutral-20"
                  placeholder={`Code block #${index + 1}`}
                  value={code}
                  onChange={(e) => {
                    const updated = [...codeSections];
                    updated[index] = e.target.value;
                    setCodeSections(updated);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...codeSections];
                    updated.splice(index, 1);
                    setCodeSections(updated);
                  }}
                  className="text-primary-70 hover:text-primary-40 mt-1"
                  aria-label={`Remove code block #${index + 1}`}
                >
                  <PiTrash size={18} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => setCodeSections([...codeSections, ""])}
              className="btn btn-sm bg-neutral-90 border border-neutral-60 text-neutral-0 hover:text-primary-40 hover:border-primary-40"
            >
              + Add Code Block
            </button>
          </div>

          {/* Project Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm text-neutral-20 mb-1"
                htmlFor="liveLink"
              >
                Live Project URL
              </label>
              <input
                id="liveLink"
                type="url"
                placeholder="(e.g. https://example.com)"
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                {...register("liveLink")}
              />
            </div>

            <div>
              <label
                className="block text-sm text-neutral-20 mb-1"
                htmlFor="githubProjectLink"
              >
                GitHub Repository URL
              </label>

              <input
                id="githubProjectLink"
                type="url"
                placeholder="(e.g. https://github.com/user/repo)"
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                {...register("githubProjectLink")}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4 w-full">
            <button
              type="submit"
              disabled={loading}
              className="btn bg-primary-60 hover:bg-primary-70"
            >
              {loading
                ? "Saving..."
                : project
                ? "Update Project"
                : "Publish Project"}
            </button>
            <button
              type="button"
              className="btn bg-neutral-70 text-neutral-10 hover:bg-neutral-60 border border-neutral-60  md:w-auto"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
