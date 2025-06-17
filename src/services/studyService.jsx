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

export async function softDeleteStudy(id, token) {
  try {
    const res = await fetch(`${urlBackEnd}/studies/${id}/soft-delete`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to soft delete study:', error);
    return { error: true, message: 'Fallo en la solicitud' };
  }
}

export const createStudy = async (payload, token) => {
  try {
    const resp = await fetch(urlBackEnd + '/studies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) throw new Error('Error saving the study');

    const study = await resp.json();
    console.log('Respuesta del backend (createStudy):', study)
    return study;
  } catch (error) {
    console.error('Failed to create study:', error);
    return { error: true, message: error.message };
  }
};

export const updateStudy = async (id, payload, token) => {
  try {
    const resp = await fetch(`${urlBackEnd}/studies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) throw new Error('Error updating the study');

    const study = await resp.json();
    console.log('Respuesta del backend (updateStudy):', study);
    return study;
  } catch (error) {
    console.error('Failed to update study:', error);
    return { error: true, message: error.message };
  }
};