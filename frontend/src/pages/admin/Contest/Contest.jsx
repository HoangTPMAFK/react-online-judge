import { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";

function Contest() {
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
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const searchInput = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:8080/contest-programing/api/contest/my-created-contests",
          {
            method: "GET",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": getCookie("token")
            }
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();

        const updatedData = jsonData.data.map((item) => {
          const startTime = new Date(...item.startAt);

          const endTime = new Date(...item.endAt);
          const currentTime = new Date();

          let status = "Not Started";
          if (currentTime >= startTime && currentTime < endTime)
            status = "Underway";
          else if (currentTime >= endTime) status = "Ended";
          return { ...item, status, startTime, endTime };
        });

        setContests(updatedData);
        setFilteredData(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      contests.filter((item) =>
        item.title.toLowerCase().includes(searchStr.toLowerCase())
      )
    );
  }, [searchStr, contests]);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Start time",
      selector: (row) => row.startTime.toLocaleString(),
      sortable: true,
    },
    {
      name: "End time",
      selector: (row) => row.endTime.toLocaleString(),
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => {
        const duration = row.endTime - row.startTime;
        const hours = Math.floor(duration / 3600000);
        // get phần nguyên
        const minutes = Math.floor((duration % 3600000) / 60000);
        return `${hours}h ${minutes}m`;
      },
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded text-white font-semibold ${
            row.status === "Underway"
              ? "bg-yellow-500"
              : row.status === "Ended"
              ? "bg-red-500"
              : "bg-blue-500"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded"
            onClick={() => {
              window.location.href = "/admin/contest/view/" + row.id;
            }}
          >
            View
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
            onClick={() => {
              window.location.href = "/admin/contest/edit/" + row.id;
            }}
          >
            Edit
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded">
            Delete
          </button>
        </div>
      ),
    },
  ];
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f1f5f9",
      },
    },
    headCells: {
      style: {
        color: "",
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
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black font-medium pb-6">Contests</h1>
      <div className="flex justify-between mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Contest
        </button>
        <input
          ref={searchInput}
          onInput={(e) => setSearchStr(e.target.value)}
          type="text"
          placeholder="Search"
          className="border border-gray-400 p-2 rounded w-60"
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        progressPending={loading}
        customStyles={customStyles}
        paginationPerPage={10}
        highlightOnHover
        paginationRowsPerPageOptions={[5, 10, 20, 50]}
        pointerOnHover
        striped
      />
    </main>
  );
}

export default Contest;
