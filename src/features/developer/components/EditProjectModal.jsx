import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { PiFile, PiImages } from "react-icons/pi";
import { TagsInputDev } from "../components/TagsInputDev";

export function EditProjectModal({ project, onSubmitProject, onClose }) {
  const [skills, setSkills] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      year: '',
      category: '',
      githubProjectLink: '',
      liveLink: '',
      projectSkills: [{ skill: '' }],
      gallery: [{ url: '' }],
      ...project,
    },
  });

  const { fields: galleryFields, append: galleryAppend, remove: galleryRemove } = useFieldArray({
    control,
    name: 'gallery',
  });

  useEffect(() => {
    if (project) {
      reset({
        title: project.title || '',
        description: project.description || '',
        year: project.year || '',
        category: project.category || '',
        githubProjectLink: project.githubProjectLink || '',
        liveLink: project.liveLink || '',
        projectSkills: project.projectSkills.map(skill => ({ skill })) || [{ skill: '' }],
        gallery: project.gallery.map(url => ({ url })) || [{ url: '' }],
      });
      setSkills(project.projectSkills || []);
    }
  }, [project, reset]);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      projectSkills: skills.map(s => s.trim()).filter(Boolean),
      gallery: data.gallery.map(g => g.url.trim()).filter(Boolean),
    };
    onSubmitProject(formattedData);
  };

  if (!project) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-3xl bg-neutral-80 border border-neutral-70 text-neutral-0 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
        

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Project Details Section */}
          <section className="space-y-4 mt-3">
            <header className="flex items-center gap-2 text-primary-50 font-semibold text-lg">
              <PiFile size={20} />
              <h3>Project Details</h3>
            </header>

            <div>
              <label className="block text-sm text-neutral-20 mb-1">Título</label>
              <input
                {...register('title', { required: 'El título es obligatorio' })}
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40"
                type="text"
                placeholder="Write your project title..."
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm text-neutral-20 mb-1">Descripción</label>
              <textarea
                {...register('description')}
                className="textarea textarea-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40"
                rows={3}
                placeholder="Describe your project here..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-20 mb-1">Año</label>
                <input
                  {...register('year')}
                  className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40"
                  type="text"
                  placeholder="(e.g. 2020)"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-20 mb-1">Categoría</label>
                <input
                  {...register('category')}
                  className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40"
                  type="text"
                  placeholder="Category"
                />
              </div>
            </div>

            <hr className="border-t border-neutral-60 mt-3" />
          </section>

          {/* Skills Section */}
          {/* Skills Section */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 font-semibold text-primary-50">
              Habilidades
            </label>
            <TagsInputDev
              value={skills}
              onChange={(tags) => setSkills(tags)}
              placeholder="Añade habilidades y presiona enter"
            />
          </div>


          {/* Gallery Section */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 font-semibold text-primary-50">
              <PiImages size={20} />
              Galería de Imágenes
            </label>
            {galleryFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <input
                  type="url"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 flex-1 placeholder-neutral-40"
                  {...register(`gallery.${index}.url`)}
                  defaultValue={field.url}
                />
                <button
                  type="button"
                  onClick={() => galleryRemove(index)}
                  className="btn btn-sm bg-neutral-90 border border-neutral-60 text-red-400 hover:text-red-300"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => galleryAppend({ url: '' })}
              className="btn btn-sm bg-neutral-90 border border-neutral-60 text-neutral-0 hover:text-primary-40 hover:border-primary-40"
            >
              + Añadir Imagen
            </button>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-20 mb-1">Live Project URL</label>
              <input
                {...register('liveLink')}
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40"
                type="url"
                placeholder="(e.g. https://example.com)"
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-20 mb-1">GitHub Code URL</label>
              <input
                {...register('githubProjectLink')}
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40"
                type="url"
                placeholder="(e.g. https://github.com/user/repo)"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn bg-primary-60 text-neutral-10 hover:bg-primary-70 w-full md:w-auto"
            >
              {isSubmitting ? "Saving..." : "Edit Project"}
            </button>
            <button
              type="button"
              className="btn bg-neutral-70 text-neutral-10 hover:bg-neutral-60 border border-neutral-60 w-full md:w-auto"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}