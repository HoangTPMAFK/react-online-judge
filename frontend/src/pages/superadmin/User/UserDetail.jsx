import { useRef, useState } from "react";
import CKEditorComponent from "../../../components/CKEditorComponent";
import DataTable from "react-data-table-component";

function UserDetail() {
  const searchInput = useRef(null);
  
  const problemColumns = [
      { name: "#", selector: row => row.no, sortable: true },
      { name: "Title", selector: row => row.title },
      { name: "Point", selector: row => row.point, sortable: true }
  ];

  const userColumns = [
      { name: "#", selector: row => row.rank, sortable: true },
      { name: "Username", selector: row => row.username },
      { name: "Score", selector: row => row.score, sortable: true }
  ];

  const [problems, setData] = useState([
      { no: 1, title: "Problem A", point: 100 },
      { no: 2, title: "Problem B", point: 200 },
      { no: 3, title: "Problem C", point: 300 },
      { no: 4, title: "Problem D", point: 100 },
      { no: 5, title: "Problem E", point: 200 },
      { no: 6, title: "Problem F", point: 300 },
      { no: 7, title: "Problem G", point: 100 },
      { no: 8, title: "Problem H", point: 200 },
      { no: 9, title: "Problem I", point: 300 },
      { no: 10, title: "Problem J", point: 100 },
  ]);

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

  const [users, setUsers] = useState([
      { rank: 1, username: "Alice", score: 1200 },
      { rank: 2, username: "Bob", score: 1150 },
      { rank: 3, username: "Charlie", score: 1100 },
      { rank: 4, username: "David", score: 1050 },
      { rank: 5, username: "Eve", score: 1000 },
      { rank: 6, username: "Frank", score: 950 },
      { rank: 7, username: "Grace", score: 900 },
      { rank: 8, username: "Hannah", score: 850 },
      { rank: 9, username: "Ivan", score: 800 },
      { rank: 10, username: "Jack", score: 750 },
  ]);

  return (
    <main className="w-full flex-grow p-6">
        <h1 className="text-3xl text-black font-medium pb-6">Profile</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">First Name:</div>
            <div className="w-60 pl-2 h-8">${}</div>
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">Last Name:</div>
            <div className="w-60 pl-2 h-8">${}</div>
          </div>
          {/* <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">Start at</div>
            <input type="datetime-local" className="w-60 h-8" />
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">End at</div>
            <input type="datetime-local" className="w-60 h-8" />
          </div> */}
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">Total Score:</div>
            <div className="w-60 pl-2 h-8">${}</div>
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">Email:</div>
            <div className="w-60 pl-2 h-8">Ducvt@example.com</div>
          </div>
        </div>
        {/* <div>
          <div className="text-xl">Problems</div>
          <div className="flex justify-center mb-4">
            <input type="text" ref={searchInput} className="w-80 px-2 py-1" placeholder="Search problem" name="" id="" />
          </div>
          <div className="overflow-x-auto w-[420px] mx-auto h-40 bg-white">
            <ul>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
            </ul>
          </div>          
        </div>      */}
        <div>
          <div className="text-xl">Detail</div>
          <CKEditorComponent />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
              <p className="text-xl font-semibold mb-2">Sloved Problems</p>
              <DataTable 
                  className="px-4" 
                  customStyles={customStyles} 
                  data={problems} 
                  columns={problemColumns} 
                  pointerOnHover 
                  onRowClicked={(row) => window.location.href = `/problem/${row.no}`} 
              />
          </div>
          {/* <div>
              <p className="text-xl font-semibold mb-2">Users</p>
              <DataTable
                  className="px-4" 
                  customStyles={customStyles} 
                  data={users} 
                  columns={userColumns} 
                  pointerOnHover 
              />
          </div> */}
        </div>
        
    </main>
  );
}

export default UserDetail;