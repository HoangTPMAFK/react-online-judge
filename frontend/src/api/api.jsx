const BASE_API_URL = "http://localhost:8080/contest-programing/api"
 
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}
async function apiRequest(endpoint, body, method = "GET", isFormData = false) {
    try {
        const URL = `${BASE_API_URL}/${endpoint}`;
        console.log("Requesting:", URL);

        let headers = {
            "Authorization": getCookie("token"),
        };

        let requestBody;
        
        if (isFormData) {
            requestBody = body; // Nếu là FormData, giữ nguyên
        } else {
            headers["Content-Type"] = "application/json";
            requestBody = body && (method === "POST" || method === "PUT") ? JSON.stringify(body) : undefined;
        }

        const response = await fetch(URL, {
            method: method,
            headers: isFormData ? headers : { ...headers, "Content-Type": "application/json" },
            body: requestBody,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}


export default apiRequest;
