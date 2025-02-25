import DataTable from "react-data-table-component";
import { useState } from "react";
import {
  Hourglass,
  CheckCircle,
  Clock,
  Calendar,
  TrophyIcon,
} from "lucide-react";
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
  const [data] = useState([
    {
      no: 1,
      title: "2024 ACM Qualifier Round 2",
      date: "2024-9-26 13:00",
      duration: "16 days",
      status: "Underway",
    },
    {
      no: 2,
      title: "2024 ACM Qualifier",
      date: "2024-9-19 13:00",
      duration: "7 days",
      status: "Ended",
    },
    {
      no: 3,
      title: "University Programming Contest",
      date: "2024-3-9 12:30",
      duration: "4 hours",
      status: "Ended",
    },
    {
      no: 4,
      title: "QDU 2023 ACM Training",
      date: "2023-12-3 16:20",
      duration: "5 hours",
      status: "Ended",
    },
    {
      no: 5,
      title: "2024 ACM Qualifier Round 2",
      date: "2024-9-26 13:00",
      duration: "16 days",
      status: "Underway",
    },
    {
      no: 1,
      title: "2024 ACM Qualifier Round 2",
      date: "2024-9-26 13:00",
      duration: "16 days",
      status: "Underway",
    },
    {
      no: 2,
      title: "2024 ACM Qualifier",
      date: "2024-9-19 13:00",
      duration: "7 days",
      status: "Ended",
    },
    {
      no: 3,
      title: "University Programming Contest",
      date: "2024-3-9 12:30",
      duration: "4 hours",
      status: "Ended",
    },
    {
      no: 4,
      title: "QDU 2023 ACM Training",
      date: "2023-12-3 16:20",
      duration: "5 hours",
      status: "Ended",
    },
    {
      no: 5,
      title: "2024 ACM Qualifier Round 2",
      date: "2024-9-26 13:00",
      duration: "16 days",
      status: "Underway",
    },
    {
      no: 1,
      title: "2024 ACM Qualifier Round 2",
      date: "2024-9-26 13:00",
      duration: "16 days",
      status: "Underway",
    },
    {
      no: 2,
      title: "2024 ACM Qualifier",
      date: "2024-9-19 13:00",
      duration: "7 days",
      status: "Ended",
    },
    {
      no: 3,
      title: "University Programming Contest",
      date: "2024-3-9 12:30",
      duration: "4 hours",
      status: "Ended",
    },
    {
      no: 4,
      title: "QDU 2023 ACM Training",
      date: "2023-12-3 16:20",
      duration: "5 hours",
      status: "Ended",
    },
    {
      no: 5,
      title: "2024 ACM Qualifier Round 2",
      date: "2024-9-26 13:00",
      duration: "16 days",
      status: "Underway",
    },
  ]);

  const filteredData = data.filter(
    (item) =>
      (statusFilter === "All" || item.status === statusFilter) &&
      item.title.toLowerCase().includes(searchStr.toLowerCase())
  );

  const columns = [
    {
      name: "Contest Info",
      selector: (row) => row.title,
      sortable: true,
      cell: (row) => (
        <Link>
          <div className="flex items-center gap-4">
            <TrophyIcon className="text-yellow-400" size={42} />
            <div>
              <div className="text-lg font-semibold">{row.title}</div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {row.date} • {row.duration}
              </div>
            </div>
          </div>
        </Link>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      right: true,
      cell: (row) => (
        <div
          className={`flex items-center gap-2 px-3 py-1 border ${
            statusColors[row.status]
          }`}
        >
          {statusIcons[row.status]}
          <span className="text-sm font-medium">
            {row.status.replace("_", " ")}
          </span>
        </div>
      ),
    },
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
        onRowClicked={(row) => window.location.href = `/contest/${row.no}`}
      />
    </div>
  );
}

export default Contests;
