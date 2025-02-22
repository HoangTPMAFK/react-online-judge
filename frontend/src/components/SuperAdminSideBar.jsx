import React from 'react';
import { Plus, Gauge, StickyNote, Table, AlignLeft, Tablet, Calendar, ArrowUpCircle, Trophy, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Admin from '../pages/admin/Admin';

const AdminSideBar = () => {
  const navItems = [
    { icon: <Gauge className="mr-3" />, label: 'Dashboard', href: '/' },
    // { icon: <Table className="mr-3" />, label: 'Tables', href: 'table' },
    // { icon: <AlignLeft className="mr-3" />, label: 'Forms', href: 'form' },
    { icon: <Tablet className="mr-3" />, label: 'Tabbed Content', href: 'tab' },
    { icon: <Trophy className="mr-3" />, label: 'Contest', href: 'contest' },
    { icon: <AlignLeft className="mr-3" />, label: 'Problem', href: 'problem' },
    { icon: <User className="mr-3" />, label: 'User', href: 'user' },
    { icon: <StickyNote className="mr-3" />, label: 'Role', href: 'Role' },
    { icon: <Calendar className="mr-3" />, label: 'Permission', href: 'Permission' },
  ];

  return (
    <aside className="relative bg-[#3d68ff] h-screen w-64 hidden sm:block shadow-xl">
      <div className="p-6">
        <a href="/" className="text-white text-2xl font-semibold uppercase hover:text-gray-300">
          Super Admin
        </a>
        <button className="w-full bg-white text-[#3d68ff] font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
          <Plus className="mr-3" /> New Report
        </button>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={`/superadmin/${item.href}`}
            className={({ isActive }) =>
              `flex items-center py-4 pl-6 nav-item ${
                isActive
                  ? 'bg-[#1947ee] text-white font-bold' 
                  : 'text-white opacity-75 hover:opacity-100 hover:bg-[#1947ee]'
              }`
            }
          >
            {item.icon} {item.label}
          </NavLink>
        ))}
      </nav>
      <a
        href="/"
        className="absolute w-full bottom-0 bg-[#1947ee] hover:bg-[#0038fd] text-white flex items-center justify-center py-4"
      >
        <ArrowUpCircle className="mr-3" />
        Upgrade to Pro!
      </a>
    </aside>
  );
};

export default AdminSideBar;
