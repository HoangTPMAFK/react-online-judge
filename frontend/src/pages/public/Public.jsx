import { Link, Route, Routes, useNavigate } from "react-router-dom";
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
import NotFound from "../NotFound";
import { FaTrophy } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { MdBarChart } from "react-icons/md";
import { LuTableProperties } from "react-icons/lu";
import { IoMdHome } from "react-icons/io";
import { useEffect, useState } from "react";
import { introspect, isAuthenticated, xorEncryptDecrypt } from '../../api/auth';
import Cookies from "js-cookie";

function Public() {

  const [account, setAccount] = useState(null);
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate(); // Thay thế window.location.href

  

  useEffect(() => {
    let isMounted = true; // Biến kiểm tra component có còn mounted không
  
    const checkAuth = async () => {
      if (!isMounted) return;
  
      const valid = await isAuthenticated();
      if (!isMounted) return;
  
      if (valid) {
        setAuth(true);
        introspect("USER", true);
        setAccount(JSON.parse(xorEncryptDecrypt(atob(localStorage.getItem("account")), localStorage.getItem("loginTime")) || "{}"));
      }
    };
  
    checkAuth();
  
    return () => {
      isMounted = false; // Hủy bỏ nếu component bị unmount
    };
  }, [navigate]);

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
              <Link
                to="/"
                className="flex space-x-3 px-4 hover:text-[#61DAFB] duration-500 ease-in-out"
              >
                <IoMdHome className="w-5 h-5 mt-1" />
                <span> Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/problem"
                className="flex space-x-3 px-4 hover:text-[#61DAFB] duration-500 ease-in-out"
              >
                <LuTableProperties className="w-5 h-5 mt-1.5" />
                <span> Problems</span>
              </Link>
            </li>
            <li>
              <Link
                to="/contest"
                className="flex space-x-3 px-4 hover:text-[#61DAFB] duration-500 ease-in-out"
              >
                <FaTrophy className="w-5 h-5 mt-1.5" />
                <span> Contests</span>
              </Link>
            </li>
            <li>
              <Link
                to="/rank"
                className="flex space-x-3 px-4 hover:text-[#61DAFB] duration-500 ease-in-out"
              >
                <FaRankingStar className="w-5 h-5 mt-1.5" />
                <span>Rank</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* ✅ Hiển thị thông tin tài khoản nếu đã đăng nhập */}
        {account ? (
          <div
            className="flex items-center space-x-2 hover:cursor-pointer"
            onClick={() => (window.location.href = "/account")}
          >
            <img
              src={"http://localhost:8080/contest-programing/"+account.avatar}
              className="h-10 w-10 rounded-full"
              alt="User Avatar"
            />
            <span className="text-xl font-bold">{account.username}</span>
          </div>
        ) : (
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
        )}
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Public;
