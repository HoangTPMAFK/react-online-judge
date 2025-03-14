import { useEffect, useRef, useState } from "react";
import CKEditorComponent from "../../../components/CKEditorComponent";
import DataTable from "react-data-table-component";
import PropTypes from "prop-types";
import { apiRequest } from "../../../api/api";
import { useParams } from "react-router-dom";

function UserDetail({edit}) {
  const searchInput = useRef(null);
  const [user, setUser] = useState([]);
  const [roles, setRoles] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    apiRequest("user/"+id, user, "GET")
      .then(response => setUser(response.data))
      .catch(err => console.error(err))
    apiRequest("role/", user, "GET")
      .then(response => setRoles(response.data))
      .catch(err => console.error(err))
  }, [])
  
  const problemColumns = [
      { name: "#", selector: row => row.id, sortable: true },
      { name: "Title", selector: row => row.problemTitle },
      { name: "Point", selector: row => row.point, sortable: true }
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

  const editUser = () => {
    
  }

  return (
    <form className="w-full flex-grow p-6" onSubmit={editUser}>
        <h1 className="text-3xl text-black font-medium pb-6">Profile</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">First Name:</div>
            <input
              type="text"
              className="w-60 h-8 border px-2"
              disabled={!edit}
              value={user.fname || ""}
              onChange={(e) =>
                edit && setContest({ ...user, fname: e.target.value })
              }
            />
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">Last Name:</div>
            <input
              type="text"
              className="w-60 h-8 border px-2"
              disabled={!edit}
              value={user.lname || ""}
              onChange={(e) =>
                edit && setContest({ ...user, lname: e.target.value })
              }
            />
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">Total Score:</div>
            <input
              type="number"
              className="w-60 h-8 border px-2"
              disabled={true}
              value={user.point}
              onChange={(e) =>
                edit && setContest({ ...user, point: e.target.value })
              }
            />
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">Email:</div>
            <input
              type="email"
              className="w-60 h-8 border px-2"
              disabled={!edit}
              value={user.email || ""}
              onChange={(e) =>
                edit && setContest({ ...user, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">Date of birth:</div>
            <input
              type="date"
              className="w-60 h-8 border px-2"
              disabled={!edit}
              value={(new Date(user.dob || 0)).toISOString().split('T')[0] || ""}
              onChange={(e) =>
                edit && setContest({ ...user, dob: e.target.value })
              }
            />
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">Roles:</div>
            <div className="flex flex-col">
            {roles.map(role => 
              <div key={role.name} className="flex">
                <input 
                  type="checkbox" 
                  checked={user.roles.includes(role.name)}
                  onClick={() => 
                    setUser(user => ({
                      ...user, 
                      roles: user.roles.includes(role.name) 
                        ? user.roles.filter(r => r !== role.name)
                        : [...user.roles, role.name]
                    }))
                  }
                /> 
                {role.name}
              </div>
            )}

            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
              <p className="text-xl font-semibold mb-2">Solved Problems</p>
              <DataTable 
                  className="px-4" 
                  customStyles={customStyles} 
                  data={user.solvedProblems} 
                  columns={problemColumns} 
                  pointerOnHover 
                  onRowClicked={(row) => window.location.href = `/problem/${row.id}`} 
              />
          </div>
        </div>
        
    </form>
  );
}

UserDetail.defaultProps = {
  edit: false,
};

UserDetail.propTypes = {
  edit: PropTypes.bool,
};

export default UserDetail;