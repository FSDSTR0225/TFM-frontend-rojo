const BASE_URL = import.meta.env.VITE_BASE_URL;
const urlBackEnd = `${BASE_URL}`;

export const getAllDevelopers = async () => {
  try {
    const resp = await fetch(urlBackEnd + "/devs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch developers:", error);
    return { error: true, message: error.message };
  }
};
