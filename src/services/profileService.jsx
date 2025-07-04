const BASE_URL = import.meta.env.VITE_BASE_URL;
const urlBackEnd = `${BASE_URL}`;

export const getAllRecruiters = async () => {
  try {
    const resp = await fetch(urlBackEnd + "/recruiters", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch Recruiters:", error);
    return { error: true, message: error.message };
  }
};

export const getProfileDev = async (_id) => {
  try {
    const response = await fetch(urlBackEnd + `/devs/${_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("Data: " + data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateProfile = async (devProfile, token) => {
  console.log("Dev Profile:", devProfile);
  console.log("Dev token:", token);

  try {
    const resp = await fetch(urlBackEnd + "/devs/profile", {
      method: "PUT",
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(devProfile),
    });
    if (!resp.ok) {
      throw new Error("Error editing the devProfile");
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

export const updateProfileRecruiter = async (recProfile, token) => {
  console.log("Rec Profile:", recProfile);
  console.log("Dev token:", token);

  try {
    const resp = await fetch(urlBackEnd + "/recruiters/profile", {
      method: "PUT",
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recProfile),
    });
    if (!resp.ok) {
      throw new Error("Error editing the recProfile");
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

export const getRecruiterById = async (_id) => {
  try {
    const response = await fetch(`${urlBackEnd}/recruiters/${_id}`);
    if (!response.ok) {
      throw new Error("Error getting user");
    }
    const recruiterData = await response.json();
    console.log("🚀 ~ getRecruiterById ~ recruiterData:", recruiterData);

    return recruiterData;
  } catch (error) {
    console.error("profileService Error:", error);
    throw error;
  }
};

export const sendProfileUpdate = async (formData, role, token) => {
  let dataToSend = {
    email: formData.userinfo1.email,
    name: formData.userinfo1.name,
    surname: formData.userinfo1.surname,
    birthDate: formData.userinfo1.birthDate,
    phone: formData.userinfo1.phone,
    avatar: formData.userinfo2.imageUrl,
    description: formData.userinfo2.description,
    hasCompletedOnboarding: true,
    role: {
      type: role,
    },
  };

  if (role === "developer") {
    dataToSend.role.developer = {
      professionalPosition: formData.roletype1.professionalPosition,
      resume: formData.roletype1.resume,
      experienceYears: formData.roletype1.experienceYears,
      location: formData.roletype1.location,
      linkedin: formData.roletype1.linkedin,
      github: formData.roletype1.github,
      skills: formData.roletype2.skills || [],
      languages: formData.roletype1.languages || [],
    };
  } else if (role === "recruiter") {
    // Aquí armamos el objeto contact explícitamente para evitar problemas
    const contact = {
      email: formData.recruiter1.contactEmail || "", // o ajusta la propiedad real
      phone: formData.recruiter1.contactPhone || "",
    };

    dataToSend.role.recruiter = {
      companyName: formData.recruiter1.companyName,
      location: formData.recruiter1.location,
      sector: formData.recruiter1.sector,
      website: formData.recruiter1.website,
      contact: contact,
      multimedia: formData.recruiter1.multimedia,
    };
  } else {
    throw new Error("Rol no válido");
  }

  const url =
    role === "developer"
      ? urlBackEnd + "/devs/onboarding"
      : urlBackEnd + "/recruiters/profile";

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al actualizar perfil");
  }

  return response.json();
};
