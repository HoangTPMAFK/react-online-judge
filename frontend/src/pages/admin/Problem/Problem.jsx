import { useRef, useState } from "react";
import DataTable from "react-data-table-component";

function Problem() {
    const searchInput = useRef(null)
    const columns = [
        {
            name: "#",
            selector: row => row.no
        },
        {
            name: "Title",
            selector: row => row.title
        },
        {
            name: "Point",
            selector: row => row.point
        }
    ];
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
    const [problems, setProblems] = useState(data)
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
        const keyword = searchInput.current.value;
        const filteredContests = data.filter(data => data.title.toLowerCase().includes(keyword.toLowerCase()));
        setProblems(filteredContests);
    }
    return(
    <main className="w-full flex-grow p-6">
        <h1 className="text-3xl text-black font-medium pb-6">Contests</h1>
        <div className="flex justify-between mb-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Contest
          </button>
          <input ref={searchInput} onInput={() => handleSearch()} type="text" placeholder="Search" className="border border-gray-400 p-2 rounded w-60" />
        </div>
        <DataTable columns={columns} data={problems} pagination customStyles={customStyles}/>
    </main>)
}

export default Problem