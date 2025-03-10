import { useEffect, useRef, useState } from "react";
import CKEditorComponent from "../../../components/CKEditorComponent";
import DataTable from "react-data-table-component";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import apiRequest from "../../../api/api";

// Hàm chuyển mảng (ví dụ: [2023, 5, 15, 14, 30]) sang chuỗi datetime-local ("yyyy-MM-ddTHH:mm")
function formatDateTimeForInput(arr) {
  if (!Array.isArray(arr) || arr.length < 5) return "";
  const date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4]);
  return date.toISOString().slice(0, 16);
}

// Hàm format datetime theo pattern yyyy-MM-dd'T'HH:mm:ss.SSS
function formatDateTimeForRequest(date) {
  const pad = (num, size = 2) => {
    let s = String(num);
    while (s.length < size) s = "0" + s;
    return s;
  };
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    "." +
    pad(date.getMilliseconds(), 3)
  );
}

function ContestDetail({ edit }) {
  const { id } = useParams();
  const [contest, setContest] = useState({});
  const [problems, setProblems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [users, setUsers] = useState([]);
  const searchInput = useRef(null);

  // Nếu contest có creatorId, dùng nó; nếu không, đặt mặc định là 0
  const defaultCreatorId = contest.creatorId || 0;

  useEffect(() => {
    // Fetch contest detail
    apiRequest(`contest/${id}`, {}, "GET")
      .then((response) => {
        const data = response.data;
        // Nếu startAt, endAt là mảng thì chuyển thành chuỗi phù hợp với input datetime-local
        if (Array.isArray(data.startAt)) {
          data.startAt = formatDateTimeForInput(data.startAt);
        }
        if (Array.isArray(data.endAt)) {
          data.endAt = formatDateTimeForInput(data.endAt);
        }
        setContest(data);
      })
      .catch((error) => console.error(error));

    // Fetch contest problems
    apiRequest(`contest/problem/${id}`, {}, "GET")
      .then((response) => {
        setProblems(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    setUsers(contest.contestParticipators || []);
  }, [contest]);

  const problemColumns = [
    { name: "#", selector: (row) => row.id, sortable: true },
    { name: "Title", selector: (row) => row.title },
    { name: "Point", selector: (row) => row.point, sortable: true },
  ];

  const userColumns = [
    { name: "#", selector: (row) => row.id, sortable: true },
    { name: "Username", selector: (row) => row.username },
    { name: "Point", selector: (row) => row.point, sortable: true },
  ];

  const removeProblem = (problemId) => {
    setProblems(problems.filter((p) => p.id !== problemId));
  };

  const customStyles = {
    headRow: { style: { backgroundColor: "#e2e8f0" } },
    headCells: { style: { fontWeight: "bold", fontSize: "14px" } },
    rows: { style: { minHeight: "48px" } },
  };

  const searchProblem = () => {
    const query = searchInput.current.value.trim();
    if (!query) {
      setShowDropdown(false);
      return;
    }
    apiRequest(
      `problem/my-created-problems/${encodeURIComponent(query)}`,
      null,
      "GET"
    )
      .then((response) => {
        if (response?.data?.length > 0) {
          setSearchResults(response.data);
          setShowDropdown(true);
        } else {
          setShowDropdown(false);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        setShowDropdown(false);
      });
  };

  const addProblem = (problemItem) => {
    if (!problems.some((p) => p.id === problemItem.id)) {
      setProblems([...problems, problemItem]);
    }
    setShowDropdown(false);
  };

  // Hàm submit form, gửi request PUT đến endpoint contest/{id} với body theo ContestCreationRequest,
  // bao gồm trường problems là mảng các id dưới dạng chuỗi.
  const editContest = (e) => {
    e.preventDefault();
    const now = new Date();
    const requestBody = {
      title: contest.title,
      password: contest.password || null,
      // Chuyển chuỗi datetime-local sang định dạng "yyyy-MM-dd'T'HH:mm:ss.SSS"
      startAt: formatDateTimeForRequest(new Date(contest.startAt)),
      creatorId: defaultCreatorId,
      endAt: formatDateTimeForRequest(new Date(contest.endAt)),
      // Gửi mảng các id của problem dưới dạng chuỗi
      problems: problems.map((p) => p.title.toString()),
      detail: contest.detail,
      createAt: contest.createAt
        ? contest.createAt
        : formatDateTimeForRequest(new Date()),
      updateAt: formatDateTimeForRequest(now),
    };

    console.log("Request Body:", requestBody); // Debug: kiểm tra dữ liệu gửi đi

    apiRequest(`contest/${id}`, requestBody, "PUT")
      .then((response) => {
        console.log("Contest updated successfully:", response);
      })
      .catch((error) => console.error("Error updating contest:", error));
  };

  return (
    <form className="w-full flex-grow p-6" onSubmit={editContest}>
      <h1 className="text-3xl text-black font-medium pb-6">Contests</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-row justify-between mb-4">
          <div className="text-xl">Title</div>
          <input
            type="text"
            className="w-60 pl-2 h-8 border"
            disabled={!edit}
            value={contest.title || ""}
            onChange={(e) =>
              edit && setContest({ ...contest, title: e.target.value })
            }
          />
        </div>
        <div className="flex flex-row justify-between mb-4">
          <div className="text-xl">Password</div>
          <input
            type="text"
            className="w-60 pl-2 h-8 border"
            disabled={!edit}
            value={contest.password || ""}
            onChange={(e) =>
              edit && setContest({ ...contest, password: e.target.value })
            }
          />
        </div>
        <div className="flex flex-row justify-between mb-4">
          <div className="text-xl">Start at</div>
          <input
            type="datetime-local"
            className="w-60 h-8 border"
            disabled={!edit}
            value={contest.startAt || ""}
            onChange={(e) =>
              edit && setContest({ ...contest, startAt: e.target.value })
            }
          />
        </div>
        <div className="flex flex-row justify-between mb-4">
          <div className="text-xl">End at</div>
          <input
            type="datetime-local"
            className="w-60 h-8 border"
            disabled={!edit}
            value={contest.endAt || ""}
            onChange={(e) =>
              edit && setContest({ ...contest, endAt: e.target.value })
            }
          />
        </div>
      </div>

      {/* Problems List Section */}
      <div>
        <div className="text-xl">Problems</div>
        <div className="flex justify-center mb-4 relative">
          <input
            type="text"
            ref={searchInput}
            className="w-80 px-2 py-1 border"
            placeholder="Search problem"
            disabled={!edit}
            onInput={searchProblem}
          />
          {showDropdown && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-80 bg-white border shadow-lg rounded-md z-50 max-h-60 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((prob) => (
                  <div
                    key={prob.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-center"
                    onClick={() => addProblem(prob)}
                  >
                    {prob.title} - {prob.point} points
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 text-center">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
        <div className="overflow-x-auto w-[420px] mx-auto h-40 bg-white">
          <ul>
            {problems.map((prob) => (
              <li
                key={prob.id}
                className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl items-center"
              >
                <div className="col-span-2">{prob.title}</div>
                <div>{prob.point} points</div>
                {edit && (
                  <button
                    type="button"
                    onClick={() => removeProblem(prob.id)}
                    className="bg-red-500 text-white text-md mr-1 py-1 w-10 h-8 rounded hover:bg-red-700"
                  >
                    X
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detail Section with CKEditor */}
      <div>
        <div className="text-xl mt-12">Detail</div>
        <CKEditorComponent
          key={contest.detail}
          detailHtml={contest.detail}
          disabled={!edit}
          onChange={(data) =>
            edit && setContest({ ...contest, detail: data })
          }
        />
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

      {edit && (
        <div className="flex justify-end my-4 mx-4">
          <button
            type="submit"
            className="px-4 bg-blue-600 py-2 text-white font-semibold rounded-xl"
          >
            Edit
          </button>
        </div>
      )}
    </form>
  );
}

ContestDetail.defaultProps = {
  edit: false,
};

ContestDetail.propTypes = {
  edit: PropTypes.bool,
};

export default ContestDetail;
