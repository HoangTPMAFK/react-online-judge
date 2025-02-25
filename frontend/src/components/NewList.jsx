import DataTable from "react-data-table-component";
import { Hourglass, CheckCircle, Clock, Calendar, Trophy } from "lucide-react";

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

function NewList({ data }) {
  const columns = [
    {
      name: "Contest Info",
      selector: (row) => row.title,
      sortable: true,
      cell: (row) => (
        <div>
          <div className="text-lg font-semibold">{row.title}</div>
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> {row.date} • {row.duration}
          </div>
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <div
          className={`flex items-center gap-2 px-3 py-1 border rounded-full ${
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
    <DataTable
      data={data}
      columns={columns}
      pagination
      highlightOnHover
      pointerOnHover
      striped
    />
  );
}

export default NewList;
