import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { Hourglass, CheckCircle, Clock, Calendar, TrophyIcon } from "lucide-react";
import { Link } from "react-router-dom";

const statusIcons = {
  Underway: <Hourglass className="w-4 h-4 text-yellow-500" />,
  Ended: <CheckCircle className="w-4 h-4 text-red-500" />,
  Not_Started: <Clock className="w-4 h-4 text-blue-500" />,
};

const statusColors = {
  Underway: "bg-yellow-100 text-yellow-700 border-yellow-500",
  Ended: "bg-red-100 text-red-700 border-red-500",
  Not_Started: "bg-blue-100 text-blue-700 border-blue-500",
};

function Contests() {
  const [searchStr, setSearchStr] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/contest-programing/api/contest/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Apply search & filter
  useEffect(() => {
    setFilteredData(
      data.filter((item) => {
        // Convert `startAt` and `endAt` into Date objects
        const startTime = new Date(item.startAt[0], item.startAt[1] - 1, item.startAt[2], item.startAt[3], item.startAt[4], item.startAt[5]);
        const endTime = new Date(item.endAt[0], item.endAt[1] - 1, item.endAt[2], item.endAt[3], item.endAt[4], item.endAt[5]);
        const currentTime = new Date();
  
        // Determine actual status
        let calculatedStatus = "Not_Started"; // Default status
        if (currentTime >= startTime && currentTime < endTime) {
          calculatedStatus = "Underway";
        } else if (currentTime >= endTime) {
          calculatedStatus = "Ended";
        }
  
        // Filter by search & status
        return (
          (statusFilter === "All" || calculatedStatus === statusFilter) &&
          item.title.toLowerCase().includes(searchStr.toLowerCase())
        );
      })
    );
  }, [data, searchStr, statusFilter]);
  
  console.log(data);

  const columns = [
    {
      name: "Contest Info",
      selector: (row) => row.title,
      sortable: true,
      grow: 2, // Make this column take more space
      cell: (row) => {
        const contestDate = new Date(
          row.startAt[0], // Year
          row.startAt[1] - 1, // Month (0-based in JS)
          row.startAt[2], // Day
          row.startAt[3] || 0, // Hour (optional)
          row.startAt[4] || 0, // Minute (optional)
          row.startAt[5] || 0 // Second (optional)
        );
  
        return (
          <Link to={`/contest/${row.id}`} className="flex items-center gap-4 w-full">
            <TrophyIcon className="text-yellow-400" size={42} />
            <div className="flex-1">
              <div className="text-lg font-semibold">{row.title}</div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {contestDate.toLocaleString()} {/* Formats date nicely */}
              </div>
            </div>
          </Link>
        );
      },
    },
    {
      name: "Status",
      selector: (row) => row.status || "UNKNOWN",
      sortable: true,
      grow: 1, // Make this column smaller than "Contest Info"
      right: true,
      cell: (row) => {
        // Convert `startAt` and `endAt` from array to Date objects
        const startTime = new Date(row.startAt[0], row.startAt[1] - 1, row.startAt[2], row.startAt[3], row.startAt[4], row.startAt[5]);
        const endTime = new Date(row.endAt[0], row.endAt[1] - 1, row.endAt[2], row.endAt[3], row.endAt[4], row.endAt[5]);
        const currentTime = new Date();
    
        // Determine contest status based on time
        let finalStatus = "NOT_STARTED"; // Default
        if (currentTime >= startTime && currentTime < endTime) {
          finalStatus = "UNDERWAY";
        } else if (currentTime >= endTime) {
          finalStatus = "ENDED";
        }
    
        // Define readable status labels
        const statusLabels = {
          UNDERWAY: "Underway",
          NOT_STARTED: "Not Started",
          ENDED: "Ended",
        };
    
        // Define colors
        const statusColors = {
          UNDERWAY: "bg-yellow-100 text-yellow-700 border-yellow-500",
          NOT_STARTED: "bg-blue-100 text-blue-700 border-blue-500",
          ENDED: "bg-red-100 text-red-700 border-red-500",
        };
    
        // Define icons
        const statusIcons = {
          UNDERWAY: <Hourglass className="w-4 h-4 text-yellow-500" />,
          NOT_STARTED: <Clock className="w-4 h-4 text-blue-500" />,
          ENDED: <CheckCircle className="w-4 h-4 text-red-500" />,
        };
    
        return (
          <div
            className={`flex items-center gap-2 px-3 py-1 border ${
              statusColors[finalStatus]
            }`}
          >
            {statusIcons[finalStatus]}
            <span className="text-sm font-medium">{statusLabels[finalStatus]}</span>
          </div>
        );
      },
    }
  ];

  return (
    <div className="max-w-5xl bg-white shadow-sm mx-auto">
      <div className="flex flex-row justify-between mx-4 py-4 items-center">
        <div className="text-xl font-semibold">All Contests</div>
        <div className="flex flex-row gap-4 justify-between items-center">
          <select
            className="border border-gray-300 rounded px-2 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Underway">Underway</option>
            <option value="Not_Started">Not Started</option>
            <option value="Ended">Ended</option>
          </select>
          <input
            className="w-56 border border-gray-300 rounded-[4px] px-2 py-2"
            type="text"
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
            placeholder="Enter to search..."
          />
        </div>
      </div>

      <DataTable
        data={filteredData}
        columns={columns}
        pagination
        paginationPerPage={10}
        highlightOnHover
        paginationRowsPerPageOptions={[5, 10, 20, 50]}
        pointerOnHover
        striped
        customStyles={{
          headRow: { style: { backgroundColor: "#f1f5f9" } },
          headCells: {
            style: {
              fontWeight: "bold",
              fontSize: "14px",
              paddingLeft: "12px",
              paddingRight: "12px",
            },
          },
          cells: { style: { paddingLeft: "12px", paddingRight: "12px" } },
          rows: { style: { minHeight: "48px" } },
        }}
        onRowClicked={(row) => (window.location.href = `/contest/${row.id}`)}
      />
    </div>
  );
}

export default Contests;
