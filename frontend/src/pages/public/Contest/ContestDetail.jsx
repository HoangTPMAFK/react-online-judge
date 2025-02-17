import DataTable from "react-data-table-component";
import { useState } from "react";

function ContestDetail() {
    const problemColumns = [
        { name: "#", selector: row => row.no, sortable: true },
        { name: "Title", selector: row => row.title },
        { name: "Point", selector: row => row.point, sortable: true }
    ];

    const userColumns = [
        { name: "#", selector: row => row.rank, sortable: true },
        { name: "Username", selector: row => row.username },
        { name: "Score", selector: row => row.score, sortable: true }
    ];

    const [data, setData] = useState([
        { no: 1, title: "Problem A", point: 100 },
        { no: 2, title: "Problem B", point: 200 },
        { no: 3, title: "Problem C", point: 300 },
        { no: 4, title: "Problem D", point: 100 },
        { no: 5, title: "Problem E", point: 200 },
        { no: 6, title: "Problem F", point: 300 },
        { no: 7, title: "Problem G", point: 100 },
        { no: 8, title: "Problem H", point: 200 },
        { no: 9, title: "Problem I", point: 300 },
        { no: 10, title: "Problem J", point: 100 },
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

    return (
        <div className="mx-8 p-8 bg-white">
            <p className="text-4xl font-semibold">2024 ACM Qualifier</p>
            <p className="py-2">Started at: 2024-9-19 13:00</p>
            <p className="py-2">Ended at: 2024-9-20 13:00</p>
            <div>
                <p className="mt-4">
                    The <span className="font-semibold">2024 ACM Qualifier</span> is a prestigious 
                    competitive programming contest where teams of three tackle a series of 
                    algorithmic problems within a limited timeframe. Participants will be tested 
                    on their problem-solving skills, coding efficiency, and teamwork. 
                </p>
                <p className="mt-2">
                    The contest follows the ICPC format, with penalties for incorrect submissions 
                    and a scoreboard that updates in real-time. The top teams will advance to 
                    regional finals, moving one step closer to the ICPC World Finals.
                </p>
                <p className="mt-2">
                    Get ready to put your skills to the test and compete against the best 
                    programmers in the region!
                </p>
            </div>
            <div className="my-4">
                <div>Password: </div>
                <input type="text" className="px-2 py-1 border" placeholder="Plank if no password" />
                <button className="bg-blue-600 text-white py-1 px-2 rounded-md ml-4">Enter</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xl font-semibold mb-2">Problems</p>
                    <DataTable 
                        className="px-4" 
                        customStyles={customStyles} 
                        data={data} 
                        columns={problemColumns} 
                        pointerOnHover 
                        onRowClicked={(row) => window.location.href = `/problem/${row.no}`} 
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
