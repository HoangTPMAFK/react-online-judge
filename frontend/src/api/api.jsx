import Cookies from "js-cookie";

const BASE_API_URL = "http://localhost:8080/contest-programing/api"
  
export function getCookie(name) {
    return Cookies.get(name) || null;
}

export async function apiRequest(endpoint, body, method = "GET", isFormData = false) {
    try {
        const URL = `${BASE_API_URL}/${endpoint}`;
        console.log("Requesting:", URL);

        let headers = {
            "Authorization": getCookie("token"),
        };

        let requestBody;
        
        if (isFormData) {
            requestBody = body;
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
            console.log("HTTP Status:", response.status);
            console.log("Response Text:", await response.text());
            return;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}