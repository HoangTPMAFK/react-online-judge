import { useState } from "react";

function User() {
    const [data, setData] = useState([
        { no: 1, title: "Problem A", difficulty: "Easy", success_rate: 75, point: 100 },
        { no: 2, title: "Problem B", difficulty: "Medium", success_rate: 60, point: 200 },
        { no: 3, title: "Problem C", difficulty: "Hard", success_rate: 40, point: 300 },
        { no: 4, title: "Problem D", difficulty: "Easy", success_rate: 80, point: 100 },
        { no: 5, title: "Problem E", difficulty: "Medium", success_rate: 55, point: 200 },
        { no: 6, title: "Problem F", difficulty: "Hard", success_rate: 35, point: 300 },
        { no: 7, title: "Problem G", difficulty: "Easy", success_rate: 85, point: 100 },
        { no: 8, title: "Problem H", difficulty: "Medium", success_rate: 50, point: 200 },
        { no: 9, title: "Problem I", difficulty: "Hard", success_rate: 30, point: 300 },
        { no: 10, title: "Problem J", difficulty: "Easy", success_rate: 90, point: 100 },
    ]);
    return (
        <div className="max-w-5xl mx-auto">
        <img src="/anonymous-avatar.jpg" className="rounded-full mx-auto border aspect-square h-36 z-10 mt-10 relative top-6" />
        <div className="bg-white shadow-md mb-6">
            <div className="text-center text-4xl py-8">HoangTPMAFK</div>
            <div className="flex border-b justify-around pb-8">
                <div className="flex flex-col items-center"><span className="text-2xl mb-2">Solved</span><span className="bg-slate-200 border border-gray-600 p-4 rounded-md">10</span> </div>
                <div className="flex flex-col items-center"><span className="text-2xl mb-2">Submission</span><span className="bg-slate-200 border border-gray-600 p-4 rounded-md">15</span> </div>
                <div className="flex flex-col items-center"><span className="text-2xl mb-2">Points</span><span className="bg-slate-200 border border-gray-600 p-4 rounded-md">160</span> </div>
            </div>
            <div className="pb-8">
                <div className="text-center text-2xl py-8">List of solved problems</div>
                <ul className="mx-auto w-1/2 min-w-[300px] text-center">
                {data.map(problem => (
                    <li 
                        key={problem.no} 
                        className="p-2 mb-2 border border-slate-300 hover:cursor-pointer" 
                        onClick={() => window.location.href = `/problem/${problem.no}`}
                    >
                        {problem.title}
                    </li>
                ))}
                </ul>
            </div>
        </div>
        </div>
    );
}

export default User;