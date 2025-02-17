function Home() {
    return(
    <div className="max-w-5xl bg-white shadow-sm mx-auto">
        <div className="text-xl p-4">Announcements</div>
        <div className="px-4 text-md font-medium text-slate-600">
            <ul>
            <li className="grid grid-cols-6 py-2">
                    <div className="col-span-3 px-4">
                        <a href="#" className="hover:text-blue-500 hover:underline">Contest "123 456" has been ended</a>
                    </div>
                    <div className="col-span-2 px-4">
                        12-12-2020 15:42:23
                    </div>
                    <div className="px-4">
                        By root
                    </div>
                </li>
                <li className="grid grid-cols-6 py-2">
                    <div className="col-span-3 px-4">
                        <a href="#" className="hover:text-blue-500 hover:underline">Problem "123 456" has been added</a>
                    </div>
                    <div className="col-span-2 px-4">
                        12-12-2020 15:42:23
                    </div>
                    <div className="px-4">
                        By root
                    </div>
                </li>
                <li className="grid grid-cols-6 py-2">
                    <div className="col-span-3 px-4">
                        <a href="#" className="hover:text-blue-500 hover:underline">Contest "123 456" has been started</a>
                    </div>
                    <div className="col-span-2 px-4">
                        12-12-2020 15:42:23
                    </div>
                    <div className="px-4">
                        By root
                    </div>
                </li>
                <li></li>
                <li></li>
            </ul>
        </div>

    </div>)
}

export default Home