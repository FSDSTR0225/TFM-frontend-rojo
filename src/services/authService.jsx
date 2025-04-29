const urlBackEnd = 'http://localhost:3000';

export const registeredUser = async (user) => {
    try {
        const resp = await fetch(urlBackEnd + '/users/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await resp.json();
        return data;

    } catch (error) {
        throw error;
    }
}