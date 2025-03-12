import { useState, useEffect } from "react";
import { authenticate, isAuthenticated } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../api/api";

function Login() {
    const [loginRequest, setLoginRequest] = useState({ username: "", password: "" });
    const navigate = useNavigate(); // Thay thế window.location.href
    const [error, setError] = useState("");

    useEffect(() => {
        const checkAuth = async () => {
            const valid = await isAuthenticated();
            if (valid) {
                navigate("/admin", { replace: true });
            } else if (getCookie("token") !== null && !valid) {
                setError("Wrong username or password")
            }
        };
        checkAuth();
    }, [navigate]);

    const login = async (e) => {
        e.preventDefault();
        await authenticate({ loginRequest });
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='bg-white p-8 rounded-lg shadow-lg'>
                <h1 className='text-2xl font-bold text-center'>Login</h1>
                {error && <p className="text-red-500 text-xl font-semibold">{error}</p>} 
                <form className='flex flex-col gap-4 mt-4' onSubmit={login}>
                    <input 
                        type='text' 
                        placeholder='Username' 
                        className='p-2 border border-gray-300 rounded-lg w-80' 
                        value={loginRequest.username}
                        onChange={(e) => setLoginRequest({ ...loginRequest, username: e.target.value })}
                    />
                    <input 
                        type='password' 
                        placeholder='Password' 
                        className='p-2 border border-gray-300 rounded-lg w-80'
                        value={loginRequest.password}
                        onChange={(e) => setLoginRequest({ ...loginRequest, password: e.target.value })}
                    />
                    <button type='submit' className='bg-blue-500 text-white p-2 rounded-lg'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
