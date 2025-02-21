function Login() {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
        <div className='bg-white p-8 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold text-center'>Login</h1>
            <form className='flex flex-col gap-4 mt-4'>
            <input type='text' placeholder='Username' className='p-2 border border-gray-300 rounded-lg' />
            <input type='password' placeholder='Password' className='p-2 border border-gray-300 rounded-lg' />
            <button type='submit' className='bg-blue-500 text-white p-2 rounded-lg'>Login</button>
            </form>
        </div>
        </div>
    );
}

export default Login;