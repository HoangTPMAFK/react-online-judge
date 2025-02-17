function Register() {
    return(<div className="max-w-2xl bg-white shadow-sm mx-auto">
        <div className="text-xl p-4">Register</div>
        <div className="px-4 text-md font-medium text-slate-600">
            <form>
                <div className="py-2">
                    <label className="block">Username</label>
                    <input className="border px-2 py-2 w-full" type="text" />
                </div>
                <div className="py-2">
                    <label className="block">Email</label>
                    <input className="border px-2 py-2 w-full" type="email" />
                </div>
                <div className="py-2">
                    <label className="block">Password</label>
                    <input className="border px-2 py-2 w-full" type="password" />
                </div>
                <div className="py-2">
                    <label className="block">Confirm Password</label>
                    <input className="border px-2 py-2 w-full" type="password" />
                </div>
                <div className="py-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
                </div>
            </form>
        </div>
    </div>);
}

export default Register;