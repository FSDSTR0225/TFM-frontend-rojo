import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  PiTrash,
  PiImages,
  PiFilmSlate,
  PiCodeBlock,
  PiFile,
} from "react-icons/pi";
import { CategorySelect } from "../components/CategorySelect";
import { TagsInputDev } from "../components/TagsInputDev";
import { createProject } from "../../../services/projectService";

export const NewProjectModal = ({ onClose }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });
  const [codeSections, setCodeSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [galleryUrls, setGalleryUrls] = useState([""]);
  const [videoUrl, setVideoUrl] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  const skills = watch("projectSkills") || [];

  const currentYear = new Date().getFullYear();

  const isValidImageUrl = (url) => {
    if (!url) return false;
    return (
      /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(url) ||
      url.includes("format=auto")
    );
  };

  const handleGalleryChange = (index, value) => {
    const updated = [...galleryUrls];
    updated[index] = value;
    setGalleryUrls(updated);
  };

  const handleAddGallery = () => {
    if (galleryUrls.length < 5) {
      setGalleryUrls([...galleryUrls, ""]);
    }
  };

  const handleRemoveGallery = (index) => {
    const updated = [...galleryUrls];
    updated.splice(index, 1);
    setGalleryUrls(updated);
  };

  const handleAddCodeSection = () => {
    setCodeSections([...codeSections, ""]);
  };

  const handleCodeChange = (index, value) => {
    const updated = [...codeSections];
    updated[index] = value;
    setCodeSections(updated);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    const filteredGallery = galleryUrls
      .map((url) => url.trim())
      .filter((url) => isValidImageUrl(url));

    const cleanVideoUrl =
      showVideo && /\.(mp4|webm|ogg)$/i.test(videoUrl.trim())
        ? videoUrl.trim()
        : null;

    const payload = {
      ...data,
      codeSections,
      gallery: filteredGallery,
      videoUrl: cleanVideoUrl,
    };

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found, please login");
      setLoading(false);
      return;
    }

    try {
      const project = await createProject(payload, token);
      console.log("ID del proyecto creado:", project.project._id);

      reset();
      setCodeSections([""]);
      setGalleryUrls([""]);
      setVideoUrl("");
      setShowVideo(false);
      onClose();

      navigate(`/projects/${project.project._id}`);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="project_modal" className="modal modal-open">
      <div className="modal-box max-w-3xl bg-neutral-70 border border-neutral-60 text-neutral-0 shadow-md rounded-lg">
        <h2 className="space-y-4 pt-2 text-2xl font-bold mb-4">
          Create New Project
        </h2>
        <hr className="border-t border-neutral-55 pt-4 mt-3" />

        {error && <p className="text-red-400 mb-2">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <section className="space-y-4 mt-3">
            <header className="flex items-center gap-2 text-primary-50 font-semibold text-lg ">
              <PiFile size={20} />
              <h3>Project Details</h3>
            </header>

            {/* Project Title */}
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

            {/* Year, Role, Duration */}
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

            <div className="grid grid-cols-2 gap-4">
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

            {/* Project Description */}
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
          <div className="space-y-4 pt-4">
            <div className="text-primary-50">
              <label className="font-semibold flex items-center gap-2 mb-1">
                <PiImages size={20} />
                Add Images
              </label>
              <p className="text-sm text-neutral-30">
                Add up to five images. The first will be the project thumbnail.
              </p>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {galleryUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-28 h-28 rounded overflow-hidden border border-neutral-60 bg-neutral-60"
                >
                  {url && isValidImageUrl(url) ? (
                    <img
                      src={url}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="flex items-center justify-center w-full h-full text-sm text-neutral-40 ">
                      Preview
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveGallery(index)}
                    className="absolute top-1 right-1 bg-neutral-90 text-primary-40 hover:text-primary-70 font-bold rounded-full w-6 h-6 flex items-center justify-center shadow"
                    aria-label={`Remove image #${index + 1}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {galleryUrls.map((url, index) => (
                <input
                  key={index}
                  type="url"
                  placeholder={`Image URL #${index + 1}`}
                  value={url}
                  onChange={(e) => handleGalleryChange(index, e.target.value)}
                  className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic placeholder:text-sm"
                  aria-label={`Image URL #${index + 1}`}
                />
              ))}
            </div>

            {galleryUrls.length < 5 && (
              <button
                type="button"
                onClick={handleAddGallery}
                className="btn btn-sm bg-neutral-90 border border-neutral-60 text-neutral-0 hover:text-primary-40 hover:border-primary-40"
              >
                + Add more
              </button>
            )}
            <hr className="border-t border-neutral-55" />
          </div>

          {/* Video Section with toggle */}
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between">
              <label
                className={`font-semibold flex items-center gap-2 ${
                  showVideo ? "text-primary-50" : "text-neutral-30"
                }`}
              >
                <PiFilmSlate size={20} />
                Add a video URL (optional)
              </label>
              <input
                type="checkbox"
                className="toggle toggle-sm border-neutral-50 bg-neutral-90 checked:bg-primary-60"
                checked={showVideo}
                onChange={(e) => setShowVideo(e.target.checked)}
              />
            </div>

            {showVideo && (
              <div className="space-y-2">
                <input
                  type="url"
                  placeholder="Paste a YouTube video URL here"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full -mt-2 placeholder-neutral-40 placeholder:italic placeholder:text-sm"
                />

                {videoUrl.trim() && (
                  <div className="aspect-video w-full rounded border border-neutral-60 bg-neutral-70 overflow-hidden">
                    <iframe
                      src={videoUrl}
                      title="Video Preview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full object-cover"
                      frameBorder="0"
                    />
                  </div>
                )}
              </div>
            )}
            <hr className="border-t border-neutral-55" />
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
                  onChange={(e) => handleCodeChange(index, e.target.value)}
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
              onClick={handleAddCodeSection}
              className="btn btn-sm bg-neutral-90 border border-neutral-60 text-neutral-0 hover:text-primary-40 hover:border-primary-40"
            >
              + Add Code Block
            </button>
          </div>

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
                GitHub Code URL
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
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn bg-primary-60 text-neutral-0 hover:bg-primary-70 w-full md:w-auto"
            >
              {loading ? "Saving..." : "Publish Project"}
            </button>
            <button
              type="button"
              className="btn bg-neutral-70 text-neutral-10 hover:bg-neutral-60 border border-neutral-60 w-full md:w-auto"
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
