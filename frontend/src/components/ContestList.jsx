import { useRef, useState } from "react";
import { Calendar, Trophy } from "lucide-react";

function ContestList({ contests }) {
  const searchStr = useRef("");
  const contestsPerPage = 10;
  const [filteredContests, setFilteredContests] = useState(
    contests.slice(1, contestsPerPage)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(contests.length / contestsPerPage);

  const statusBadge = [];
  statusBadge["Underway"] = "text-green-500";
  statusBadge["Ended"] = "text-red-600";
  statusBadge["Not_Started"] = "text-blue-500";

  const search = () => {
    const filter = contests.filter((c) =>
      c.title.toLowerCase().includes(searchStr.current.value.toLowerCase())
    );
    setFilteredContests(filter);
    setCurrentPage(1); // Reset to the first page after a new search
  };

  // Handle pagination
  const paginate = (page) => {
    const startIndex = (page - 1) * contestsPerPage;
    const endIndex = page * contestsPerPage;
    setFilteredContests(contests.slice(startIndex, endIndex));
    setCurrentPage(page);
  };

  const searchByStatus = () => {
    const statusValue = document.querySelector("#status").value;
    if (statusValue === "All") {
      setFilteredContests(contests.slice(1, contestsPerPage));
    } else {
      const filter = contests.filter((c) =>
        c.status.toLowerCase().includes(statusValue.toLowerCase())
      );
      setFilteredContests(filter);
      setCurrentPage(1);
    }
  };

  return (
    <div className="p-4">
      <div className="font-semibold text-xl pb-4">All contests</div>
      <div className="flex flex-row justify-between">
        <select onChange={searchByStatus} id="status" name="status">
          <option value={"All"} hidden>
            Status
          </option>
          <option value={"All"}>All</option>
          <option value={"Underway"}>Underway</option>
          <option value={"Not_Started"}>Not_Started</option>
          <option value={"Ended"}>Ended</option>
        </select>
        <input
          type="text"
          id="search-input"
          className="border px-2 py-1 w-56"
          placeholder="Keyword"
          ref={searchStr}
          onInput={() => search()}
        />
      </div>
      <ul className="my-4">
        {filteredContests.map((contest) => (
          <li
            key={contest.no}
            className="flex flex-row justify-between items-center px-2 py-2 border hover:cursor-pointer"
            onClick={() => (window.location.href = `/contest/${contest.no}`)}
          >
            <div className="flex flex-row items-center">
              <Trophy className="text-yellow-400 mx-4" size={32} />
              <div>
                <div className="text-2xl font-semibold">{contest.title}</div>
                <div className="flex flex-row items-center">
                  <Calendar className="text-blue-500 mr-1" size={16} />
                  <div className="text-sm text-gray-500">
                    {contest.date} • {contest.duration}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                "border rounded-xl flex items-center px-3 " +
                statusBadge[contest.status]
              }
            >
              <span className="text-3xl pb-1">•</span>
              <span className="ml-2 text-sm font-medium">{contest.status}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center gap-4 text-lg font-sans">
        <button
          onClick={() => paginate(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div>
          Page {currentPage} of {maxPage}
        </div>
        <button
          onClick={() => paginate(Math.min(currentPage + 1, maxPage))}
          disabled={currentPage === maxPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ContestList;
