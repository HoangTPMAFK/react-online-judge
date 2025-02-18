import { useRef, useState } from "react";
import DataTable from "react-data-table-component";

function Submission() {
    const searchInput = useRef(null);

    const columns = [
        {
            name: "Title",
            selector: row => row.title,
            sortable: true
        },
        {
            name: "User",
            selector: row => row.user,
            sortable: true
        },
        {
            name: "DateTime",
            selector: row => row.datetime,
            sortable: true
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true,
            cell: row => (
                <span className={`px-2 py-1 rounded text-white 
                    ${row.status === "Accepted" ? "bg-green-500" : 
                    row.status === "Wrong Answer" ? "bg-red-500" : 
                    row.status === "Time Limit Exceeded" ? "bg-yellow-500" : 
                    "bg-gray-500"}`}>
                    {row.status}
                </span>
            )
        }
    ];

    const [data, setData] = useState([
        { title: "Problem A", user: "Alice", datetime: "2025-02-18 12:30", status: "Accepted" },
        { title: "Problem B", user: "Bob", datetime: "2025-02-18 13:00", status: "Wrong Answer" },
        { title: "Problem C", user: "Charlie", datetime: "2025-02-18 13:45", status: "Accepted" },
        { title: "Problem D", user: "David", datetime: "2025-02-18 14:10", status: "Time Limit Exceeded" },
        { title: "Problem E", user: "Eve", datetime: "2025-02-18 14:30", status: "Accepted" }
    ]);

    const [filteredData, setFilteredData] = useState(data);

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: "#e2e8f0", // Gray color
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

    const handleSearch = () => {
        const keyword = searchInput.current.value.toLowerCase();
        const filteredSubmissions = data.filter(submission => 
            submission.title.toLowerCase().includes(keyword) ||
            submission.user.toLowerCase().includes(keyword) ||
            submission.status.toLowerCase().includes(keyword)
        );
        setFilteredData(filteredSubmissions);
    };

    return (
        <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black font-medium pb-6">Submissions</h1>
            <div className="flex justify-between mb-4">
                <input 
                    ref={searchInput} 
                    onInput={handleSearch} 
                    type="text" 
                    placeholder="Search submissions..." 
                    className="border border-gray-400 p-2 rounded w-60" 
                />
            </div>
            <DataTable 
                columns={columns} 
                data={filteredData} 
                pagination 
                customStyles={customStyles} 
            />
        </main>
    );
}

export default Submission;
