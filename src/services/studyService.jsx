const urlBackEnd = 'http://localhost:3000';

// Obtener studies por developer
export async function getStudiesByDeveloper(developerId, token) {
  try {
    const res = await fetch(urlBackEnd + `/studies/owner/${developerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch studies by developer:', error);
    return { error: true, message: 'Request failed' };
  }
}

