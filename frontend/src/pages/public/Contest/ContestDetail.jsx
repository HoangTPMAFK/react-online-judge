import DataTable from "react-data-table-component";
import ReactHtmlParser from 'react-html-parser'; 
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

function ContestDetail() {
    function getCookie(name) {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            let [key, value] = cookie.split("=");
            if (key === name) {
                return decodeURIComponent(value);
            }
        }
        return null;
    }
    const { id } = useParams();
    const contestPassword = useRef(null);
    const problemColumns = [
        { name: "#", selector: row => row.id, sortable: true },
        { name: "Title", selector: row => row.title },
        { name: "Point", selector: row => row.point, sortable: true }
    ];

    const userColumns = [
        { name: "#", selector: row => row.rank, sortable: true },
        { name: "Username", selector: row => row.username },
        { name: "Score", selector: row => row.point, sortable: true }
    ];

    const [contest, setContest] = useState(Object);

    const [problems, setProblems] = useState([
        { id: 1, title: "Problem A", point: 100 },
        { id: 2, title: "Problem B", point: 200 },
        { id: 3, title: "Problem C", point: 300 },
        { id: 4, title: "Problem D", point: 100 },
        { id: 5, title: "Problem E", point: 200 },
        { id: 6, title: "Problem F", point: 300 },
        { id: 7, title: "Problem G", point: 100 },
        { id: 8, title: "Problem H", point: 200 },
        { id: 9, title: "Problem I", point: 300 },
        { id: 10, title: "Problem J", point: 100 },
    ]);

    const [topUsers, setTopUsers] = useState([
        { rank: 1, username: "Alice", score: 1200 },
        { rank: 2, username: "Bob", score: 1150 },
        { rank: 3, username: "Charlie", score: 1100 },
        { rank: 4, username: "David", score: 1050 },
        { rank: 5, username: "Eve", score: 1000 },
        { rank: 6, username: "Frank", score: 950 },
        { rank: 7, username: "Grace", score: 900 },
        { rank: 8, username: "Hannah", score: 850 },
        { rank: 9, username: "Ivan", score: 800 },
        { rank: 10, username: "Jack", score: 750 },
    ]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:8080/contest-programing/api/contest/"+id);
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();
                setContest(jsonData.data || Object);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        setProblems(contest.problems);
        if (contest.contestParticipators)
            setTopUsers([...contest.contestParticipators]
                .sort((a, b) => a.point - b.point)
                .map((user, index) => ({
                    ...user,
                    rank: index+1
                }))
            );
    }, [contest]);

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: "#f1f5f9",
            },
        },
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                paddingLeft: "12px",
                paddingRight: "12px",
            },
        },
        cells: {
            style: {
                paddingLeft: "12px",
                paddingRight: "12px",
            },
        },
        rows: {
            style: {
                minHeight: "48px",
            },
        },
    };
    const joinContest = async () => {
        if (!getCookie("token")) {
            alert("You haven't login yet");
            window.location.href = "/login";
        }
        try {
            const response = await fetch(`http://localhost:8080/contest-programing/api/contest/${contest.id}/join`, {
                method: "POST",
                headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie("token")}` // Include token
                },
                body: JSON.stringify({password: contestPassword.current.value})
            });      
        
            const jsonData = await response.json();
            if (!response.ok) {
                alert(jsonData.message)
                throw new Error(`HTTP error! Status: ${response.status}.`);
            } else {
                alert("Join contest successfully");
            }
        } catch (error) {
            console.error("Error while joining contest: ", error);
        }
    }

    return (
        <div className="mx-8 p-8 bg-white">
            <p className="text-4xl font-semibold">{contest.title}</p>
            <p className="py-2">
            Started at:{" "}
            {contest.startAt ? (
                new Date(
                contest.startAt[0], // Year
                contest.startAt[1] - 1, // Month (0-based)
                contest.startAt[2], // Day
                contest.startAt[3] || 0, // Hour
                contest.startAt[4] || 0, // Minute
                contest.startAt[5] || 0 // Second
                ).toLocaleString("en-GB", { 
                day: "2-digit", 
                month: "2-digit", 
                year: "numeric", 
                hour: "2-digit", 
                minute: "2-digit", 
                second: "2-digit" 
                })
            ) : (
                "Loading..."
            )}
            </p>

            <p className="py-2">
            Ended at:{" "}
            {contest.endAt ? (
                new Date(
                contest.endAt[0], // Year
                contest.endAt[1] - 1, // Month (0-based)
                contest.endAt[2], // Day
                contest.endAt[3] || 0, // Hour
                contest.endAt[4] || 0, // Minute
                contest.endAt[5] || 0 // Second
                ).toLocaleString("en-GB", { 
                day: "2-digit", 
                month: "2-digit", 
                year: "numeric", 
                hour: "2-digit", 
                minute: "2-digit", 
                second: "2-digit" 
                })
            ) : (
                "Loading..."
            )}
            </p>

            <div>
                {ReactHtmlParser(contest.detail)}
            </div>
            <div className="my-4">
                <div>Password: </div>
                <input type="text" className="px-2 py-1 border" placeholder="Plank if no password" ref={contestPassword} />
                <button className="bg-blue-600 text-white py-1 px-2 rounded-md ml-4" onClick={joinContest}>Enter</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xl font-semibold mb-2">Problems</p>
                    <DataTable 
                        className="px-4" 
                        customStyles={customStyles} 
                        data={problems} 
                        columns={problemColumns} 
                        pointerOnHover 
                        onRowClicked={(row) => window.location.href = `/problem/${row.id}`} 
                    />
                </div>
                <div>
                    <p className="text-xl font-semibold mb-2">Top 10 Highest Point Users</p>
                    <DataTable 
                        className="px-4" 
                        customStyles={customStyles} 
                        data={topUsers} 
                        columns={userColumns} 
                        pointerOnHover 
                    />
                </div>
            </div>
        </div>
    );
}

export default ContestDetail;
