const urlBackEnd = 'http://localhost:3000';

// Settings
export async function getSettings(token) {
  try {
    const res = await fetch(urlBackEnd + `/settings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;

  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return { error: true, message: 'Request failed' };
  }
}

export async function updatePassword(updPass, token) {
  try {
    const res = await fetch(urlBackEnd + `/settings/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword: updPass.oldPassword,
        newPassword: updPass.newPassword
      })
    });

    const data = await res.json();
    
    if (res.ok) {
      alert("Password changed!");
      return data;
    } else {
      alert("Error updating password");
      return { error: true, message: 'Error updating password' };
    }

  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return { error: true, message: 'Request failed' };
  }
}