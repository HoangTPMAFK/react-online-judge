function Login() {
    const submitHandler = async (event) => {
        event.preventDefault(); // Prevents the page from refreshing

        const requestBody = {
            username: document.querySelector("#username").value,
            password: document.querySelector("#password").value
        };

        try {
            const response = await fetch("http://localhost:8080/contest-programing/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                alert(data.message);
            }

            localStorage.setItem("token", data.data.token);
            document.cookie = "token="+data.data.token;
            window.location.href = "/account";
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold'>Login</h1>
            <form className='flex flex-col items-center justify-center' onSubmit={submitHandler}>
                <input className='p-2 m-2 w-96' type='text' id="username" placeholder='Username' required />
                <input className='p-2 m-2 w-96' type='password' id="password" placeholder='Password' required />
                <button type="submit" className='p-2 m-2 w-96 bg-blue-500 text-white rounded-md'>Login</button>
            </form>
        </div>
    );
}

export default Login;
