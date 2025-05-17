import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PiTrash } from "react-icons/pi";


export const NewProjectModal = ({ onClose }) => {
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const [codeSections, setCodeSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [galleryUrls, setGalleryUrls] = useState([""]);
  const [videoUrl, setVideoUrl] = useState("");
  const [showVideo, setShowVideo] = useState(false);

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
      .filter((url) => url && /\.(jpg|jpeg|png|gif|webp)$/i.test(url));

    const cleanVideoUrl =
      showVideo && /\.(mp4|webm|ogg)$/i.test(videoUrl.trim())
        ? videoUrl.trim()
        : null;

    const payload = {
      ...data,
      codeSections,
      gallery: filteredGallery,
      video: cleanVideoUrl,
    };

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el proyecto");
      }

      const project = await response.json();

      reset();
      setCodeSections([""]);
      setGalleryUrls([""]);
      setVideoUrl("");
      setShowVideo(false);
      onClose();

      // Redirige con React Router
      navigate(`/projects/${project.id}`);
    } catch (err) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="project_modal" className="modal modal-open">
      <div className="modal-box max-w-3xl bg-neutral-80 border border-neutral-70 text-neutral-0 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create New Project</h2>

        {error && <p className="text-red-400 mb-2">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Project Title */}
          <input
            type="text"
            placeholder="Project Title"
            className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full"
            {...register("title", { required: true })}
          />

          {/* Skills */}
          <input
            type="text"
            placeholder="Skills (comma separated)"
            className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full"
            {...register("skills")}
          />

          {/* Year, Category, Role, Duration */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Year of Creation"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full"
              {...register("year", { required: true })}
            />
            <input
              type="text"
              placeholder="Category"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full"
              {...register("category", { required: true })}
            />
            <input
              type="text"
              placeholder="Professional Role"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full"
              {...register("role")}
            />
            <input
              type="text"
              placeholder="Duration (e.g. 3 months)"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full"
              {...register("duration")}
            />
          </div>

          {/* Image Gallery Section */}
            <div className="space-y-4">
                <label className="block font-semibold text-neutral-0">
                    Añade hasta 5 imágenes a tu proyecto
                </label>

                {/* Previews en una sola línea, con scroll horizontal */}
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {galleryUrls.map((url, index) => (
                    <div
                        key={index}
                        className="relative flex-shrink-0 w-28 h-28 rounded overflow-hidden border border-neutral-60 bg-neutral-70"
                    >
                        {url && /\.(jpg|jpeg|png|gif|webp)$/i.test(url) ? (
                        <img
                            src={url}
                            alt={`Imagen ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        ) : (
                        <span className="flex items-center justify-center w-full h-full text-sm text-neutral-40">
                            Preview
                        </span>
                        )}
                        <button
                        type="button"
                        onClick={() => handleRemoveGallery(index)}
                        className="absolute top-1 right-1 bg-neutral-90 text-red-500 hover:text-red-700 font-bold rounded-full w-6 h-6 flex items-center justify-center shadow"
                        aria-label={`Eliminar imagen #${index + 1}`}
                        >
                        ×
                        </button>
                    </div>
                    ))}
                </div>

                    {/* Inputs de URL */}
                    <div className="space-y-3">
                        {galleryUrls.map((url, index) => (
                        <input
                            key={index}
                            type="url"
                            placeholder={`URL Imagen #${index + 1}`}
                            value={url}
                            onChange={(e) => handleGalleryChange(index, e.target.value)}
                            className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full"
                            aria-label={`URL Imagen #${index + 1}`}
                        />
                        ))}
                    </div>

                    {/* Botón para añadir más */}
                    {galleryUrls.length < 5 && (
                        <button
                        type="button"
                        onClick={handleAddGallery}
                        className="btn btn-sm border border-neutral-60 text-neutral-0 hover:text-primary-40"
                        >
                        + Añadir imagen
                        </button>
                    )}
                    </div>

            {/* Sección de vídeo actualizada */}
            <div className="space-y-2 pt-6">
                <label className="block font-semibold text-neutral-0">
                ¿Quieres añadir un vídeo al proyecto? (opcional)
                </label>

                {!showVideo && (
                <button
                    type="button"
                    onClick={() => setShowVideo(true)}
                    className="btn btn-sm opacity-50 border border-neutral-60 text-neutral-0 hover:opacity-100"
                >
                    Añadir vídeo
                </button>
                )}

                {showVideo && (
                <div className="space-y-2">
                    <div className="aspect-video w-full rounded border border-neutral-60 bg-neutral-70 flex items-center justify-center overflow-hidden">
                    {videoUrl && /\.(mp4|webm|ogg)$/i.test(videoUrl) ? (
                        <video controls className="w-full h-full object-cover">
                        <source src={videoUrl} />
                        Tu navegador no soporta la reproducción de vídeo.
                        </video>
                    ) : (
                        <span className="text-sm text-neutral-30">
                        Vista previa del vídeo
                        </span>
                    )}
                    </div>
                    <input
                    type="url"
                    placeholder="URL del vídeo (formato mp4, webm u ogg)"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full"
                    />
                </div>
                )}
            </div>



          {/* Project Description */}
          <textarea
            placeholder="Project Description"
            className="textarea textarea-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full"
            {...register("description")}
          />

          {/* Code Snippets */}
            <div className="space-y-2">
            <label className="block font-semibold text-neutral-0">Code Sections</label>

            {codeSections.map((code, index) => (
                <div key={index} className="relative">
                <textarea
                    className="textarea textarea-bordered bg-[#1e1e1e] text-white border border-neutral-60 w-full font-mono pr-10"
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
                    className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                    aria-label={`Eliminar bloque de código #${index + 1}`}
                >
                    <PiTrash size={18} />
                </button>
                </div>
            ))}

            <button
                type="button"
                onClick={handleAddCodeSection}
                className="btn btn-sm border border-neutral-60 text-neutral-0 hover:text-primary-40"
            >
                + Add Code Block
            </button>
            </div>



          {/* Links */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="url"
              placeholder="Live Project URL"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full"
              {...register("liveLink")}
            />
            <input
              type="url"
              placeholder="GitHub Code URL"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full"
              {...register("githubLink")}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn bg-primary-60 text-neutral-0 hover:bg-primary-50 border border-primary-50"
            >
              {loading ? "Saving..." : "Save Project"}
            </button>
            <button
              type="button"
              className="btn border border-neutral-70 text-neutral-0 hover:text-primary-40"
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
