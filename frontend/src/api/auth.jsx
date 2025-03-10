import apiRequest from "./api";

function logout(role) {
    localStorage.removeItem("token");
    window.location.href = "/" + (role && role !== "user" ? `${role.toLowerCase()}` : "") + "login";
}

function authenticate({ loginRequest, setAccount }) {
    apiRequest("auth/login", loginRequest, "POST")
        .then(response => {
            if (!response?.data?.account || !response?.data?.token) {
                throw new Error("Invalid response structure");
            }

            const account = response.data.account;
            const token = response.data.token;
            const currentRole = window.location.pathname.split("/")[1]?.toUpperCase() || "";
            
            localStorage.setItem("token", token);
            setAccount(account);

            if (!(account.roles.includes(currentRole) || (account.roles.includes("USER") && currentRole === ""))) {
                logout(currentRole);
            }
        })
        .catch(err => {
            console.error("Authentication error:", err);
            logout();
        });
}

function introspect(setAccount) {
    apiRequest("auth/introspect", null, "POST")
        .then(response => {
            if (!response?.data) {
                throw new Error("Invalid response structure");
            }
            
            if (response.data.valid === false) {
                const currentUrl = window.location.pathname.split("/")[1] || "";
                logout(currentUrl);
            } else {
                setAccount(response.data.account);
            }
        })
        .catch(err => {
            console.error("Introspection error:", err);
            logout();
        });
}

export {
    logout, 
    authenticate, 
    introspect
} ; 