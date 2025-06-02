const urlBackEnd = 'http://localhost:3000';

// Obtener experiencias por developer
export async function getExperiencesByDeveloper(developerId, token) {
  try {
    const res = await fetch(urlBackEnd + `/experiences/owner/${developerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch experiences by developer:', error);
    return { error: true, message: 'Request failed' };
  }
}



// // Crear experiencia
// export const createExperience = async (payload, token) => {
//   try {
//     const resp = await fetch(`${urlBackEnd}/experiences`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!resp.ok) {
//       const errorData = await resp.json();
//       throw new Error(errorData.msg || 'Error al crear la experiencia');
//     }

//     const { experience } = await resp.json();
//     return experience;

//   } catch (error) {
//     console.error('Failed to create experience:', error);
//     return { error: true, message: error.message };
//   }
// };
