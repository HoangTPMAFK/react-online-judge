import React from 'react';
import { Plus, Check, List } from 'lucide-react';
import AdminSideBar from '../../components/AdminSideBar';
import Dashboard from './Dashboard/Dashboard';
import Form from './Form/Form';
import Table from './Table/Table';
import Tabs from './Tabs/Tabs';
import { Route, Routes } from 'react-router-dom';
import Contest from './Contest/Contest';
import ContestDetail from './Contest/ContestDetail';
import Problem from './Problem/Problem';
import ProblemDetail from './Problem/ProblemDetail';
import AdminMobileMenu from '../../components/AdminMobileMenu';

const Admin = () => {
  const users = [
    { firstName: 'Lian', lastName: 'Smith', phone: '622322662', email: 'jonsmith@mail.com' },
    { firstName: 'Emma', lastName: 'Johnson', phone: '622322662', email: 'jonsmith@mail.com' },
    { firstName: 'Oliver', lastName: 'Williams', phone: '622322662', email: 'jonsmith@mail.com' },
    { firstName: 'Isabella', lastName: 'Brown', phone: '622322662', email: 'jonsmith@mail.com' }
  ].flatMap(user => [user, user]); // Duplicate each user to match the original table

  return (
    <div className="flex bg-gray-100 font-['Karla']">
      <AdminSideBar />
      
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        {/* Desktop Header */}
        <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
          <div className="w-1/2"></div>
          <div className="relative w-1/2 flex justify-end">
            <button className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
              <img src="/api/placeholder/400/400" alt="profile" />
            </button>
          </div>
        </header>
        <AdminMobileMenu />
        
        <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
            <Routes>
                <Route path="/" element={<Dashboard  />} />
                <Route path="/form/" element={<Form />} />
                <Route path="/table/" element={<Table   />} />
                <Route path="/tab/" element={<Tabs />} />
                <Route path="/contest/" element={<Contest />} />
                <Route path="/contest/1" element={<ContestDetail />} />
                <Route path="/problem/" element={<Problem />} />
                <Route path="/problem/1" element={<ProblemDetail />} />
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