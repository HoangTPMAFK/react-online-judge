import DataTable from 'react-data-table-component';
import { useRef, useState } from 'react';

function Problems() {
    const searchStr = useRef("");

    const columns = [
        {
            name: "#",
            selector: row => row.no,
            sortable: true
        },
        {
            name: "Title",
            selector: row => row.title,
            sortable: true
        },
        {
            name: "Difficulty",
            selector: row => row.difficulty,
            sortable: true
        },
        {
            name: "Success Rate",
            selector: row => row.success_rate,
            sortable: true
        },
        {
            name: "Point",
            selector: row => row.point,
            sortable: true
        },
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
    ]);

    const [filteredData, setFilteredData] = useState(data);

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

    function search() {
        searchStr.current = document.querySelector("#search-input").value;
        setFilteredData(data.filter(item => item.title.toLowerCase().includes(searchStr.current.toLowerCase())));
    }

    return (
        <div className='max-w-5xl bg-white shadow-sm mx-auto'>
            <div className='flex flex-row justify-between mx-4 py-4 items-center'>
                <div className='text-xl font-semibold'>Problems list</div>
                <div className='flex flex-row gap-4 justify-between items-center'>
                    <div>Search </div>
                    <input className='w-56 border px-2 py-2' type='text' id='search-input' ref={searchStr} onInput={search} />
                </div>
            </div>

            <DataTable
                data={filteredData}
                columns={columns}
                pagination
                highlightOnHover
                pointerOnHover
                striped
                onRowClicked={row => window.location.href = `/problem/${row.no}`}
                customStyles={customStyles}
            />
        </div>
    );
}

export default Problems;
