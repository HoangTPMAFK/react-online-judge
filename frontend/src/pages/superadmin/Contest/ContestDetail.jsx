import { useRef, useState } from "react";
import CKEditorComponent from "../../../components/CKEditorComponent";
import DataTable from "react-data-table-component";

function ContestDetail() {
  const searchInput = useRef(null);

  const problemColumns = [
    { name: "#", selector: (row) => row.no, sortable: true },
    { name: "Title", selector: (row) => row.title },
    { name: "Point", selector: (row) => row.point, sortable: true },
  ];

  const userColumns = [
    { name: "#", selector: (row) => row.rank, sortable: true },
    { name: "Username", selector: (row) => row.username },
    { name: "Score", selector: (row) => row.score, sortable: true },
  ];

  const [problems, setData] = useState([
    { no: 1, title: "Problem A", point: 100 },
    { no: 2, title: "Problem B", point: 200 },
    { no: 3, title: "Problem C", point: 300 },
    { no: 4, title: "Problem D", point: 100 },
  ]);

  const [users, setUsers] = useState([
    { rank: 1, username: "Alice", score: 1200 },
    { rank: 2, username: "Bob", score: 1150 },
  ]);

  // Xóa problem khỏi danh sách
  const removeProblem = (no) => {
    setData(problems.filter((problem) => problem.no !== no));
  };

  const customStyles = {
    headRow: { style: { backgroundColor: "#e2e8f0" } },
    headCells: { style: { fontWeight: "bold", fontSize: "14px" } },
    rows: { style: { minHeight: "48px" } },
  };

  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black font-medium pb-6">Contests</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-row justify-between mb-4">
          <div className="text-xl">Title</div>
          <input type="text" className="w-60 pl-2 h-8 border" />
        </div>
        <div className="flex flex-row justify-between mb-4">
          <div className="text-xl">Password</div>
          <input type="text" className="w-60 pl-2 h-8 border" />
        </div>
        <div className="flex flex-row justify-between mb-4">
          <div className="text-xl">Start at</div>
          <input type="datetime-local" className="w-60 h-8 border" />
        </div>
        <div className="flex flex-row justify-between mb-4">
          <div className="text-xl">End at</div>
          <input type="datetime-local" className="w-60 h-8 border" />
        </div>
      </div>

      {/* Problems List */}
      <div>
        <div className="text-xl">Problem</div>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            ref={searchInput}
            className="w-80 px-2 py-1 border"
            placeholder="Search problem"
          />
        </div>
        <div className="overflow-x-auto w-[420px] mx-auto h-40 bg-white">
          <ul>
            {problems.map((problem) => (
              <li
                key={problem.no}
                className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl items-center"
              >
                <div className="col-span-2">{problem.title}</div>
                <div>{problem.point} points</div>
                <div className="float-left">
                  <button
                    onClick={() => removeProblem(problem.no)}
                    className="bg-red-500 text-white text-md mr-1 py-1 w-10 h-8 rounded hover:bg-red-700 items-end "
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detail Section */}
      <div>
        <div className="text-xl mt-12">Detail</div>
        <CKEditorComponent />
      </div>

      {/* Problems & Users Tables */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xl font-semibold mb-2">Problems</p>
          <DataTable
            className="px-4"
            customStyles={customStyles}
            data={problems}
            columns={problemColumns}
            pointerOnHover
          />
        </div>
        <div>
          <p className="text-xl font-semibold mb-2">Users</p>
          <DataTable
            className="px-4"
            customStyles={customStyles}
            data={users}
            columns={userColumns}
            pointerOnHover
          />
        </div>
      </div>
    </main>
  );
}

export default ContestDetail;
