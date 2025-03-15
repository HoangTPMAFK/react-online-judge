import React, { useEffect } from 'react';
import { Plus, Check, List } from 'lucide-react';
import SuperAdminSideBar from '../../components/SuperAdminSideBar';
import Dashboard from './Dashboard/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Contest from './Contest/Contest';
import ContestDetail from './Contest/ContestDetail';
import Problem from './Problem/Problem';
import ProblemDetail from './Problem/ProblemDetail';
import AdminMobileMenu from '../../components/AdminMobileMenu';
import User from './User/User';
import UserDetail from './User/UserDetail';
import SuperAdminAccount from './Login/SuperAdminAccount';
import RolePermissionManager from './Role/RolePermissionManager';
import PermissionManager from './Permission/PermissionManager';
import { useState } from 'react';
import { logout, authenticate, introspect, xorEncryptDecrypt } from "../../api/auth";
import Cookies from "js-cookie";


const SuperAdmin = () => {
  const users = [
    { firstName: 'Lian', lastName: 'Smith', phone: '622322662', email: 'jonsmith@mail.com' },
    { firstName: 'Emma', lastName: 'Johnson', phone: '622322662', email: 'jonsmith@mail.com' },
    { firstName: 'Oliver', lastName: 'Williams', phone: '622322662', email: 'jonsmith@mail.com' },
    { firstName: 'Isabella', lastName: 'Brown', phone: '622322662', email: 'jonsmith@mail.com' }
  ].flatMap(user => [user, user]); 

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [account, setAccount] = useState([]);

  useEffect(() => {
      introspect("superadmin");
  }, [])

  const logoutAccount = async () => {
    try {
      const response = await fetch("http://localhost:8080/contest-programing/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      const jsonData = await response.json();
      alert(jsonData.message);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}.`);
      }
      logout("admin");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      setWrongPassword(true);
    }
  };

  return (
    <div className="flex bg-gray-100 font-['Karla']">
      <SuperAdminSideBar />
      
      <div className="w-full flex flex-col h-screen overflow-y-hidden">

        <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
          <div className="w-1/2"></div>

          <div className="relative w-1/2 flex justify-end">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
              className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
            >
              <img src="/api/placeholder/400/400" alt="profile" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-[60px] w-36 bg-white rounded-md shadow-lg py-2">
                <a href="/superadmin/account" className="block px-4 py-2 text-gray-800 hover:bg-blue-600">
                  Account
                </a>
                <a onClick={logoutAccount} className="block px-4 py-2 text-gray-800 hover:bg-blue-600">
                  Sign Out
                </a>
              </div>
            )}
          </div>
        </header>

        <AdminMobileMenu />
        
        <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
            <Routes>
                <Route path="/" element={<Dashboard  />} />
                <Route path="/contest/" element={<Contest />} />
                <Route path="/contest/1" element={<ContestDetail />} />
                <Route path="/problem/" element={<Problem />} />
                <Route path="/problem/1" element={<ProblemDetail />} />
                <Route path="/user" element={<User />} />
                <Route path="/user/view/:id" element={<UserDetail />} />
                <Route path="/user/edit/:id" element={<UserDetail edit={true} />} />
                <Route path="/account/" element={<SuperAdminAccount key={Cookies.get("account")} accountInfo={JSON.parse(xorEncryptDecrypt(atob(localStorage.getItem("account")), localStorage.getItem("loginTime")) || "{}")} />} />
                <Route path="/role/" element={<RolePermissionManager />} />
                <Route path="/permission/" element={<PermissionManager />} />
            </Routes>

            <footer className="w-full bg-white text-right p-4">
                Built by <a target="_blank" href="https://davidgrzyb.com" className="underline">David Grzyb</a>.
            </footer>
        </div>

      </div>
    </div>
  );
};

export default SuperAdmin;