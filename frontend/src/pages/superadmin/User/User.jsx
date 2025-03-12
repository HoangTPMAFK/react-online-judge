import { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { apiRequest } from "../../../api/api";

function User() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    apiRequest("user/", null, "GET")
    .then(
      response => {
        setUsers(response.data)
        console.log(response)
      }
    )
    .catch(
      error => console.error(error)
    )
  }, [])
  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Username',
      selector: row => row.username,
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.roles,
      sortable: true,
    },
    // {
    //   name: 'Permission',
    //   selector: row => getDuration(row.start_date, row.end_date),
    //   sortable: true,
    // },
    {
      name: 'Action',
      cell: row => 
        <div className="flex md:flex-row flex-col">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 mr-2 rounded" 
              onClick={() => {window.location.href = '/superadmin/user/view/' + row.id}}>
                View
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mr-2 rounded" 
              onClick={() => {window.location.href = '/superadmin/user/edit/' + row.id}}>
                Edit
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded">
                Delete
            </button>
        </div>
        ,
    },
  ]
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
  const searchInput = useRef(null);
  const handleSearch = () => {
    const keyword = searchInput.current.value;
    const filteredContests = data.filter(data => data.title.toLowerCase().includes(keyword.toLowerCase()));
    setContests(filteredContests);
  }
  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black font-medium pb-6">User</h1>
      <div className="flex justify-between mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add User
        </button>
        <input ref={searchInput} onInput={() => handleSearch()} type="text" placeholder="Search" className="border border-gray-400 p-2 rounded w-60" />
      </div>
      <DataTable columns={columns} data={users} pagination customStyles={customStyles}/>
    </main>
  );
}

export default User;