const urlBackEnd = 'http://localhost:3000';

export const registeredUser = async (user) => {
    try {
        console.log('hooa...',user);
        const resp = await fetch(urlBackEnd + '/users/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    } catch (error) {
        throw error;
    }
}
