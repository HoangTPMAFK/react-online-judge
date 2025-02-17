import { useRef, useState } from "react";
import DataTable from "react-data-table-component";

function Contest() {
  const columns = [
    {
      name: 'Tittle',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Start time',
      selector: row => row.start_date,
      sortable: true,
    },
    {
      name: 'End time',
      selector: row => row.end_date,
      sortable: true,
    },
    {
      name: 'Duration',
      selector: row => getDuration(row.start_date, row.end_date),
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => 
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded" 
            onClick={() => {window.location.href = '/admin/contest/' + row.no}}>
            Edit
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
        </div>
        ,
    },
  ]
  const data = [
    { 
      no: 1, 
      title: "2024 ACM Qualifier Round 2", 
      start_date: "2024-09-26 13:00", 
      end_date: "2024-10-12 13:00", 
      status: "Underway" 
    },
    { 
      no: 2, 
      title: "2024 ACM Qualifier", 
      start_date: "2024-09-19 13:00", 
      end_date: "2024-09-26 13:00", 
      status: "Ended" 
    },
    { 
      no: 3, 
      title: "University Programming Contest", 
      start_date: "2024-03-09 12:30", 
      end_date: "2024-03-09 16:30", 
      status: "Ended" 
    },
    { 
      no: 4, 
      title: "QDU 2023 ACM Training", 
      start_date: "2023-12-03 16:20", 
      end_date: "2023-12-03 21:20", 
      status: "Ended" 
    },
    { 
      no: 5, 
      title: "2024 ACM Qualifier Round 2", 
      start_date: "2024-09-26 13:00", 
      end_date: "2024-10-12 13:00", 
      status: "Underway" 
    },
    { 
      no: 6, 
      title: "2024 ACM Qualifier", 
      start_date: "2024-09-19 13:00", 
      end_date: "2024-09-26 13:00", 
      status: "Ended" 
    },
    { 
      no: 7, 
      title: "University Programming Contest", 
      start_date: "2024-03-09 12:30", 
      end_date: "2024-03-09 16:30", 
      status: "Not Started" 
    },
    { 
      no: 8, 
      title: "QDU 2023 ACM Training", 
      start_date: "2023-12-03 16:20", 
      end_date: "2023-12-03 21:20", 
      status: "Ended" 
    },
    { 
      no: 9, 
      title: "2024 ACM Qualifier Round 2", 
      start_date: "2024-09-26 13:00", 
      end_date: "2024-10-12 13:00", 
      status: "Underway" 
    },
    { 
      no: 10, 
      title: "2024 ACM Qualifier", 
      start_date: "2024-09-19 13:00", 
      end_date: "2024-09-26 13:00", 
      status: "Not Started" 
    },
    { 
      no: 11, 
      title: "University Programming Contest", 
      start_date: "2024-03-09 12:30", 
      end_date: "2024-03-09 16:30", 
      status: "Ended" 
    },
    { 
      no: 12, 
      title: "QDU 2023 ACM Training", 
      start_date: "2023-12-03 16:20", 
      end_date: "2023-12-03 21:20", 
      status: "Not Started" 
    },
    { 
      no: 13, 
      title: "2024 ACM Qualifier Round 2", 
      start_date: "2024-09-26 13:00", 
      end_date: "2024-10-12 13:00", 
      status: "Underway" 
    },
    { 
      no: 14, 
      title: "2024 ACM Qualifier", 
      start_date: "2024-09-19 13:00", 
      end_date: "2024-09-26 13:00", 
      status: "Ended" 
    },
    { 
      no: 15, 
      title: "University Programming Contest", 
      start_date: "2024-03-09 12:30", 
      end_date: "2024-03-09 16:30", 
      status: "Underway" 
    },
    { 
      no: 16, 
      title: "QDU 2023 ACM Training", 
      start_date: "2023-12-03 16:20", 
      end_date: "2023-12-03 21:20", 
      status: "Ended" 
    }
  ];
  const getDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diff = Math.abs(endTime - startTime) / 1000; // Difference in seconds

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);

    return `${hours}h ${minutes}m`;
  };
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

  var [contests, setContests] = useState(data);
  const searchInput = useRef(null);
  const handleSearch = () => {
    const keyword = searchInput.current.value;
    const filteredContests = data.filter(data => data.title.toLowerCase().includes(keyword.toLowerCase()));
    setContests(filteredContests);
  }
  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black font-medium pb-6">Contests</h1>
      <div className="flex justify-between mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Contest
        </button>
        <input ref={searchInput} onInput={() => handleSearch()} type="text" placeholder="Search" className="border border-gray-400 p-2 rounded w-60" />
      </div>
      <DataTable columns={columns} data={contests} pagination customStyles={customStyles}/>
    </main>
  );
}

export default Contest;