const BASE_URL = import.meta.env.VITE_BASE_URL;
const urlBackEnd = `${BASE_URL}`;

export const searchProjects = async (query) => {
  try {
    const resp = await fetch(
      `${urlBackEnd}/projects/search?q=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.message || "Error fetching projects");
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Failed to search projects:", error);
    return { error: true, message: error.message };
  }
};

export const searchDevs = async (query) => {
  try {
    const resp = await fetch(
      `${urlBackEnd}/devs/search?q=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.message || "Error fetching devs");
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Failed to search devs:", error);
    return { error: true, message: error.message };
  }
};

export const searchOffers = async (query) => {
  try {
    const resp = await fetch(
      `${urlBackEnd}/offers/search?q=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.message || "Error fetching offers");
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Failed to search offers:", error);
    return { error: true, message: error.message };
  }
};
