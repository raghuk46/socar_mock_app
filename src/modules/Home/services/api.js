const commonHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json"
};

export const fetchLocations = (lat, lng, radius = 2000) => {
    const endpoint = `https://api.socar.my/zones?lat=${lat}&lng=${lng}&radius=${radius}`;
    const payload = {
        method: "GET",
        headers: { ...commonHeaders }
    };
    return handleRequest(endpoint, payload);
}

const handleRequest = (endpoint, payload) => {
    const requestUrl = endpoint;
    return fetch(requestUrl, payload).then(res => res.json());
};