import React, { useRef, useState, useEffect } from "react";

const uploadPDF = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch('http://localhost:3000/upload-pdf', {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("Upload failed");
  }
  const result = await res.json();
  return result.secure_urls[0];
};

export const ResumeUpload = ({ onValidChange, data, onDataChange, error: externalError }) => {
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const pdfFile = data?.pdfFile || null;
  const resumeUrl = data?.resumeUrl || null;
  
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB para PDFs

  const handleFile = async (file) => {
    if (!file || file.type !== "application/pdf") {
      setError("Invalid file. Only PDF files are allowed.");
      onDataChange({ ...data, pdfFile: null, resumeUrl: null });
      onValidChange?.(false);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("The PDF must be smaller than 10MB.");
      onDataChange({ ...data, pdfFile: null, resumeUrl: null });
      onValidChange?.(false);
      return;
    }

    setError(null);
    setIsUploading(true);

    // Primero guardamos el archivo para mostrar el nombre
    onDataChange({ ...data, pdfFile: file, resumeUrl: null });
    onValidChange?.(true);

    try {
      const secure_url = await uploadPDF(file);
      setIsUploading(false);
      // Una vez subido, guardamos la URL y limpiamos el archivo
      onDataChange({ ...data, pdfFile: null, resumeUrl: secure_url });
    } catch (uploadError) {
      setIsUploading(false);
      setError("Error uploading the PDF.");
      console.error('Upload error:', uploadError);
      // En caso de error, mantenemos el archivo para mostrar el nombre
      onDataChange({ ...data, pdfFile: file, resumeUrl: null });
    }
  };

  const handleFileChange = (e) => handleFile(e.target.files[0]);
  
  const openFileDialog = () => fileInputRef.current?.click();

  const truncateFileName = (name, maxLength = 30) => {
    if (name.length <= maxLength) return name;
    const ext = name.slice(name.lastIndexOf("."));
    return name.slice(0, maxLength - ext.length - 3) + "..." + ext;
  };

  const getFileNameFromUrl = (url) => {
    if (!url) return "";
    const segments = url.split('/');
    const lastSegment = segments[segments.length - 1];
    // Remover parámetros de consulta si existen
    return lastSegment.split('?')[0];
  };

  useEffect(() => {
    if (!pdfFile && !resumeUrl) onValidChange?.(false);
  }, [pdfFile, resumeUrl, onValidChange]);

  const displayFileName = pdfFile?.name || getFileNameFromUrl(resumeUrl) || "resume.pdf";
  const hasFile = pdfFile || resumeUrl;

  return (
    <div className="form-control">
      <label className="block text-sm text-neutral-20 mb-1">
        <span className="label-text font-semibold">Resume (CV)</span>
      </label>
      <p className="text-sm text-neutral-30 mb-4">
        Accepted format: PDF. Max size: 10MB.
      </p>
      
      <div className="flex flex-col items-center space-y-3">

        <div
          onClick={openFileDialog}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => ["Enter", " "].includes(e.key) && openFileDialog()}
          className={'border-2 border-dashed rounded cursor-pointer text-neutral-40 flex flex-col items-center justify-center px-4 py-10 transition-colors duration-200 w-full'
          }
        >
          {hasFile ? (
            <div className="flex flex-col items-center text-neutral-20">
              {/* Icono de PDF */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-2 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
              <p className="text-sm font-medium text-center" title={displayFileName}>
                {truncateFileName(displayFileName)}
              </p>
              <p className="text-xs text-neutral-40">Click to change PDF</p>
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Click here to select a PDF</span>
            </div>
          )}

          {isUploading && (
            <p className="mt-2 text-sm text-blue-600 text-center">Uploading PDF...</p>
          )}

          {error && (
            <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
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
        accept=".pdf,application/pdf"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isUploading}
      />
    </div>
  );
};