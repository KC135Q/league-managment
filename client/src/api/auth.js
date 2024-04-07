const authRequest = async (method, endpoint, data) => {
    try {
        const response = await fetch(`/${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Request failed');
        }
        const responseData = await response.json();
        // Handle successful response
        return responseData;
    } catch (error) {
        // Handle error response
        throw new Error(error.message);
    }
};

export default authRequest;