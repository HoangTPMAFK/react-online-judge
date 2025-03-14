import { apiRequest, getCookie } from "./api";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const getIssueTime = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.iat || null; // Trả về số giây từ epoch
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};

function xorEncryptDecrypt(text, key) {
    return text.split('').map((char, i) => 
        String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    ).join('');
}

function logout(role) {
    Cookies.remove("token")
    localStorage.removeItem("account")
    window.location.href = "/" + (role && role.toLowerCase() !== "user" ? `${role.toLowerCase()}/` : "") + "login";
}

async function isAuthenticated() {
    try {
        const response = await apiRequest("auth/introspect", null, "POST");
        return response.data.valid;
    } catch (error) {
        return false;
    }
}

async function authenticate({ loginRequest }) {
    try {
        const response = await apiRequest("auth/login", loginRequest, "POST");

        if (response.data.token == null) {
            console.log(response);
            return false;
        }

        const account = response.data.account;
        const token = response.data.token;
        const currentRole = window.location.pathname.split("/")[1]?.toUpperCase() || "";

        if (!(account.roles.includes(currentRole) || (account.roles.includes("USER") && currentRole === "LOGIN"))) {
            return false;
        }

        // Lưu token và thông tin tài khoản
        Cookies.set("token", token, { expires: 2, secure: true, sameSite: "Strict" });
        localStorage.setItem("loginTime", getIssueTime(token));
        localStorage.setItem(
            "account",
            btoa(
                xorEncryptDecrypt(
                    JSON.stringify(account),
                    localStorage.getItem("loginTime")
                )
            )
        );

        return true;
    } catch (err) {
        console.error("Authentication error:", err);
        return false;
    }
}



async function introspect(role, ignore = false) {
    if (!getCookie("token")) {
        if (!ignore) logout(role);
    } else {
        const decodedToken = jwtDecode(getCookie("token"));
        if (!decodedToken.roles.map(r => r.toUpperCase()).includes(role.toUpperCase())) {
            logout(role);
        }
    }
    apiRequest("auth/introspect", null, "POST")
        .then(response => {
            if (!response?.data) {
                throw new Error("Invalid response structure");
            }
            
            if (response.data.valid === false) {
                const currentUrl = window.location.pathname.split("/")[1] || "";
                if (!ignore) logout(currentUrl);
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
    introspect,
    isAuthenticated,
    xorEncryptDecrypt
} ; 