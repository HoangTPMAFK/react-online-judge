import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Lưu thông báo lỗi

    const submitHandler = async (event) => {
        event.preventDefault(); // Ngăn form reload trang

        const requestBody = { username, password };

        try {
            const response = await fetch("http://localhost:8080/contest-programing/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            
            if (!response.ok) {
                setError("Invalid username or password!");
                return; // Không tiếp tục xử lý nếu lỗi
            }

            localStorage.setItem("token", data.data.token);
            document.cookie = `token=${data.data.token}`;
            window.location.href = "/account"; // Chuyển hướng sau khi đăng nhập thành công
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Something went wrong. Please try again later!");
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    className="p-2 m-2 w-96 border"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
