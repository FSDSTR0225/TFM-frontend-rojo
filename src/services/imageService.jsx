const BASE_URL = import.meta.env.VITE_BASE_URL;
const urlBackEnd = `${BASE_URL}`;

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(urlBackEnd + "/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const result = await res.json();
  return result.secure_urls[0]; // O ajusta según el nombre de propiedad devuelta
};


export const uploadPDF = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  
  const res = await fetch(urlBackEnd + "/upload-pdf", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("Upload failed");
  }
  const result = await res.json();
  return result.secure_urls[0];
};
