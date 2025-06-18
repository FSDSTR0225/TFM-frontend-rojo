const urlBackEnd = 'http://localhost:3000';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(urlBackEnd + '/upload', {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const result = await res.json();
  return result.secure_urls[0]; // O ajusta según el nombre de propiedad devuelta
};