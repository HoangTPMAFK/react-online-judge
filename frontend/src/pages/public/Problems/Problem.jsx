import DataTable from "react-data-table-component";
import { useEffect, useRef, useState } from "react";
import { color } from "@uiw/react-codemirror";
import { Link } from "react-router-dom";

function Problems() {
  const searchStr = useRef("");

  

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => 
        <Link to={`/problem/${row.id}`}>{row.title}</Link>,
      sortable: true,
    },
    {
      name: "Difficult",
      selector: (row) => row.difficult,
      sortable: true,
    },
    // {
    //   name: "Success Rate",
    //   selector: (row) => row.success_rate,
    //   sortable: true,
    // },
    {
      name: "Point",
      selector: (row) => row.point,
      sortable: true,
    },
  ];

  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/contest-programing/api/problem/public",
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}. ${response.message}`);
        }
        const jsonData = await response.json(); // Chờ dữ liệu chuyển thành JSON
        setFetchedData(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    setFilteredData(fetchedData);
  }, [fetchedData])

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

  function search() {
    searchStr.current = document.querySelector("#search-input").value;
    setFilteredData(
      data.filter((item) =>
        item.title.toLowerCase().includes(searchStr.current.toLowerCase())
      )
    );
  }

  return (
    <div className="max-w-5xl bg-white shadow-sm mx-auto">
      <div className="flex flex-row justify-between mx-4 py-4 items-center">
        <div className="text-xl font-semibold">Problems list</div>
        <div className="flex flex-row gap-4 justify-between items-center">
          <div>Search </div>
          <input
            className="w-56 border border-gray-300 rounded-[4px] px-2 py-2"
            type="text"
            id="search-input"
            ref={searchStr}
            onInput={search}
            placeholder="Enter to search..."
          />
        </div>
      </div>

      <DataTable
        data={filteredData}
        columns={columns}
        pagination
        highlightOnHover
        pointerOnHover
        striped
        onRowClicked={(row) => (window.location.href = `/problem/${row.id}`)}
        customStyles={customStyles}
      />
    </div>
  );
}

export default Problems;
