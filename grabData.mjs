async function grabJson(apiUrl) {
    try {
        let res = await fetch(apiUrl);
        return await res.json();
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function grabText(apiUrl) {
    try {
        let res = await fetch(apiUrl);
        return await res.text();
    } catch (error) {
        console.error(error);
        return error;
    }
}

export { grabJson, grabText };
