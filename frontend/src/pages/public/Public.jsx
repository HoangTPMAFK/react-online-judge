import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Problem from "./Problems/Problem";
import Contest from "./Contest/Contest";
import Rank from "./Rank/Rank";
import ProblemDetail from "./Problems/ProblemDetail";
import Register from "./Register/Register";
import Login from "./Login/Login";
import ContestDetail from "./Contest/ContestDetail";
import User from "./User/User";
import Account from "./Login/Account";
import { FaTrophy } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { MdBarChart } from "react-icons/md";
import { LuTableProperties } from "react-icons/lu";
import { IoMdHome } from "react-icons/io";
function Public() {
  return (
    <div className="min-w-[860px]">
      <nav className="flex flex-row justify-between font-medium text-xl border-b shadow-md px-4">
        <div className="flex flex-row items-center">
          <img
            className="h-16 w-16 cursor-pointer"
            src={"/logo512.png"}
            onClick={() => (window.location.href = `/`)}
          />
          <ul className="px-8 flex flex-row">
            <li>
              <div className="flex flex-row space-x-2 items-center">
                <Link
                  to="/"
                  className="flex space-x-3 px-4 hover:text-[#61DAFB] duration-500 ease-in-out"
                >
                  <IoMdHome className="w-5 h-5 mt-1" />
                  <span> Home</span>
                </Link>
              </div>
            </li>
            <li>
              <div className="flex flex-row space-x-2 items-center">
                <Link
                  to="/problem"
                  className="flex space-x-3 px-4 hover:text-[#61DAFB] duration-500 ease-in-out"
                >
                  <LuTableProperties className="w-5 h-5 mt-1.5" />
                  <span> Problems</span>
                </Link>
              </div>
            </li>
            <li>
              <div className="flex flex-row space-x-2 items-center">
                <Link
                  to="/contest"
                  className="flex space-x-3 px-4 hover:text-[#61DAFB] duration-500 ease-in-out"
                >
                  <FaTrophy className="w-5 h-5 mt-1.5" />
                  <span> Contests</span>
                </Link>
              </div>
            </li>
            <li>
              <div className="flex flex-row space-x-2 items-center">
                <Link
                  to="/rank"
                  className="flex space-x-3 px-4 hover:text-[#61DAFB] duration-500 ease-in-out"
                >
                  <FaRankingStar className="w-5 h-5 mt-1.5" />
                  <span>Rank</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>

        <ul className="px-4 flex flex-row items-center">
          <li>
            <Link
              to="/login"
              className="px-4 hover:text-blue-700 duration-500 ease-in-out"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="px-4 hover:text-blue-700 duration-500 ease-in-out"
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
      <div className="bg-slate-50 py-12">
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="problem" element={<Problem />} />
            <Route path="contest" element={<Contest />} />
            <Route path="contest/:id" element={<ContestDetail />} />
            <Route path="rank" element={<Rank />} />
            <Route path="problem/:id" element={<ProblemDetail />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="user/:id" element={<User />} />
            <Route path="account" element={<Account />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Public;
