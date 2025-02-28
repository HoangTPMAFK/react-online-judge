import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function User() {
    const { id } = useParams();
    const [user, setUser] = useState(Object);
    const [solvedProblems, setSolvedProblems] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:8080/contest-programing/api/user/"+id);
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();
                setUser(jsonData.data || Object);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [])
    useEffect(() => {
        if (user.solvedProblems) setSolvedProblems(user.solvedProblems)
    }, [solvedProblems])
    return (
        <div className="max-w-5xl mx-auto">
        <img src="/anonymous-avatar.jpg" className="rounded-full mx-auto border aspect-square h-36 z-10 mt-10 relative top-6" />
        <div className="bg-white shadow-md mb-6">
            <div className="text-center text-4xl py-8">{user.username}</div>
            <div className="flex border-b justify-around pb-8">
                <div className="flex flex-col items-center"><span className="text-2xl mb-2">Solved</span><span className="bg-slate-200 border border-gray-600 p-4 rounded-md">{solvedProblems ? solvedProblems.length : 0}</span> </div>
                <div className="flex flex-col items-center"><span className="text-2xl mb-2">Submission</span><span className="bg-slate-200 border border-gray-600 p-4 rounded-md">{user.submissions ? user.submissions.length : 0}</span> </div>
                <div className="flex flex-col items-center"><span className="text-2xl mb-2">Points</span><span className="bg-slate-200 border border-gray-600 p-4 rounded-md">{user.point}</span> </div>
            </div>
            <div className="pb-8">
                <div className="text-center text-2xl py-8">List of solved problems</div>
                <ul className="mx-auto w-1/2 min-w-[300px] text-center">
                {solvedProblems.map(problem => (
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