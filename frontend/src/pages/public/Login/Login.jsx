function Login() {
    return (
        <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Login</h1>
        <form className='flex flex-col items-center justify-center'>
            <input className='p-2 m-2 w-96' type='text' placeholder='Username'></input>
            <input className='p-2 m-2 w-96' type='password' placeholder='Password'></input>
            <button className='p-2 m-2 w-96 bg-blue-500 text-white rounded-md'>Login</button>
        </form>
        </div>
    );
}

export default Login;