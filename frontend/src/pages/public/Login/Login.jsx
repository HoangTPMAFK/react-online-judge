import { useState, useEffect } from "react";
import { authenticate, isAuthenticated } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../api/api";


function Login() {
    const [loginRequest, setLoginRequest] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const [error, setError] = useState(""); // Lưu thông báo lỗi

    const submitHandler = async (event) => {
        event.preventDefault();
        const valid = await authenticate({loginRequest});
        if (valid) {
            navigate("/", { replace: true });
        } else {
            setError("Wrong username or password")
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Login</h1>
            <form className="flex flex-col items-center justify-center" onSubmit={submitHandler}>
                {error && <p className="text-red-500 text-xl font-semibold">{error}</p>} 
                <input
                    className="p-2 m-2 w-96 border"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setLoginRequest({ ...loginRequest, username: e.target.value })}
                    required
                />
                <input
                    className="p-2 m-2 w-96 border"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setLoginRequest({ ...loginRequest, password: e.target.value })}
                    required
                />
                <button type="submit" className="p-2 m-2 w-96 bg-blue-500 text-white rounded-md">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
