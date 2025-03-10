import React, { useEffect } from 'react';
import { Plus, Check, List } from 'lucide-react';
import AdminSideBar from '../../components/AdminSideBar';
import Dashboard from './Dashboard/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Contest from './Contest/Contest';
import ContestDetail from './Contest/ContestDetail';
import Problem from './Problem/Problem';
import ProblemDetail from './Problem/ProblemDetail';
import AdminMobileMenu from '../../components/AdminMobileMenu';
import AdminAccount from './Login/AdminAccount';
import { useState } from 'react';
import apiRequest from '../../api/api';
import { introspect } from '../../api/auth';

const Admin = () => {
  const users = [
    { firstName: 'Lian', lastName: 'Smith', phone: '622322662', email: 'jonsmith@mail.com' },
    { firstName: 'Emma', lastName: 'Johnson', phone: '622322662', email: 'jonsmith@mail.com' },
    { firstName: 'Oliver', lastName: 'Williams', phone: '622322662', email: 'jonsmith@mail.com' },
    { firstName: 'Isabella', lastName: 'Brown', phone: '622322662', email: 'jonsmith@mail.com' }
  ].flatMap(user => [user, user]); 

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      let [key, value] = cookie.split("=");
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [account, setAccount] = useState(Object);
  
  useEffect(() => {
    introspect(setAccount);
  }, [])

  return (
    <div className="flex bg-gray-100 font-['Karla']">
      <AdminSideBar />
      
      <div className="w-full flex flex-col h-screen overflow-y-hidden">

        <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
          <div className="w-1/2"></div>

          {/* Avatar and dropdown */}
          <div className="relative w-1/2 flex justify-end">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
              className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
            >
              <img src="/api/placeholder/400/400" alt="profile" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-[60px] w-36 bg-white rounded-md shadow-lg py-2">
                <a href="/admin/account/" className="block px-4 py-2 text-gray-800 hover:bg-blue-600">
                  Account
                </a>
                <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-blue-600">
                  Sign Out
                </a>
              </div>
            )}
          </div>
        </header>

        <AdminMobileMenu />
        
        <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/contest/" element={<Contest user={account} />} />
                <Route path="/contest/create" element={<ContestDetail />} />
                <Route path="/contest/edit/:id" element={<ContestDetail edit={true} />} />
                <Route path="/contest/view/:id" element={<ContestDetail />} />
                <Route path="/problem/" element={<Problem />} />
                <Route path="/problem/view/:id" element={<ProblemDetail />} />
                <Route path="/problem/edit/:id" element={<ProblemDetail edit={true} />} />
                <Route path="/account/" element={<AdminAccount key={JSON.stringify(account)} accountInfo={account} />} />
            </Routes>

            <footer className="w-full bg-white text-right p-4">
                Built by <a target="_blank" href="https://davidgrzyb.com" className="underline">David Grzyb</a>.
            </footer>
        </div>

      </div>
    </div>
  );
};

export default Admin;