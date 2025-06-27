import React, { useRef, useState, useEffect } from "react";
import { uploadImage } from "../../../services/imageService";

export const AvatarUpload = ({ onValidChange, data, onDataChange, error: externalError }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const imageFile = data?.imageFile || null;
  const avatarUrl = data?.avatarUrl || null;
  
  // Para preview: usar URL del servidor si existe, sino crear una temporal del archivo
  const previewUrl = avatarUrl || (imageFile ? URL.createObjectURL(imageFile) : null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Invalid file. Only images are allowed.");
      onDataChange({ ...data, imageFile: null, avatarUrl: null });
      onValidChange?.(false);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("The image must be smaller than 5MB.");
      onDataChange({ ...data, imageFile: null, avatarUrl: null });
      onValidChange?.(false);
      return;
    }

    setError(null);
    setIsUploading(true);

    // Primero guardamos el archivo para preview inmediato
    onDataChange({ ...data, imageFile: file, avatarUrl: null });
    onValidChange?.(true);

    try {
      const secure_url = await uploadImage(file);
      setIsUploading(false);
      // Una vez subido, guardamos la URL y limpiamos el archivo
      onDataChange({ ...data, imageFile: null, avatarUrl: secure_url });
    } catch (uploadError) {
      setIsUploading(false);
      setError("Error uploading the image.");
      console.error('Upload error:', uploadError);
      // En caso de error, mantenemos el archivo para el preview
      onDataChange({ ...data, imageFile: file, avatarUrl: null });
    }
  };

  const handleFileChange = (e) => handleFile(e.target.files[0]);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const openFileDialog = () => fileInputRef.current?.click();

  const truncateFileName = (name, maxLength = 25) => {
    if (name.length <= maxLength) return name;
    const ext = name.slice(name.lastIndexOf("."));
    return name.slice(0, maxLength - ext.length - 3) + "..." + ext;
  };

  useEffect(() => {
    if (!imageFile && !avatarUrl) onValidChange?.(false);
  }, [imageFile, avatarUrl, onValidChange]);

  return (
    <div className="form-control">
      <label className="block text-sm text-neutral-20 mb-1">
        <span className="label-text font-semibold">Avatar</span>
      </label>
      <p className="text-sm text-neutral-30 mb-4">
        Accepted formats: JPG, PNG, GIF. Max size: 5MB.
      </p>
      
      <div className="flex flex-col items-center space-y-3">
        {/* Zona de drag and drop */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => ["Enter", " "].includes(e.key) && openFileDialog()}
          className={`border-2 border-dashed rounded cursor-pointer flex flex-col items-center justify-center px-4 py-10 transition-colors duration-200 w-full ${
            isDragging
              ? "border-primary-60 bg-primary-10"
              : "border-neutral-40 bg-neutral-90"
          }`}
        >
          {previewUrl ? (
            <div className="avatar">
              <div className="w-24 rounded-full overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-neutral-50 select-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16V4m0 0L3 8m4-4l4 4M5 20h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>
              <span>Drag and drop an image here, or click to select</span>
            </div>
          )}

          {isUploading && (
            <p className="mt-2 text-sm text-blue-600 text-center">Uploading...</p>
          )}

          {error && (
            <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
          )}

          {imageFile && !error && (
            <p className="mt-2 text-sm text-neutral-40 text-center truncate" title={imageFile.name}>
              {truncateFileName(imageFile.name)}
            </p>
          )}
        </div>

        {/* Errores externos */}
        {externalError && (
          <div className="text-red-500 text-sm text-center">
            {externalError}
          </div>
        )}
      </div>

      {/* Input file oculto */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isUploading}
      />
    </div>
  );
};