import React from 'react';
import { Plus, Gauge, StickyNote, Table, AlignLeft, Tablet, Calendar, ArrowUpCircle, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminSideBar = () => {
  const navItems = [
    { icon: <Gauge className="mr-3" />, label: 'Dashboard', href: '', active: true },
    { icon: <StickyNote className="mr-3" />, label: 'Blank Page', href: 'blank' },
    { icon: <Table className="mr-3" />, label: 'Tables', href: 'table' },
    { icon: <AlignLeft className="mr-3" />, label: 'Forms', href: 'form' },
    { icon: <Tablet className="mr-3" />, label: 'Tabbed Content', href: 'tab' },
    { icon: <Calendar className="mr-3" />, label: 'Calendar', href: 'calendar' },
    { icon: <Trophy className='mr-3' />, label: 'Contest', href: 'contest'}
  ];

  return (
    <aside className="relative bg-[#3d68ff] h-screen w-64 hidden sm:block shadow-xl">
      <div className="p-6">
        <a href="/" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
          Admin
        </a>
        <button className="w-full bg-white text-[#3d68ff] font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
          <Plus className="mr-3" /> New Report
        </button>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        {navItems.map((item, index) => (
          <Link to={'/admin/'+item.href} className={`flex items-center py-4 pl-6 nav-item ${
                item.active 
                  ? 'bg-[#1947ee] text-white' 
                  : 'text-white opacity-75 hover:opacity-100 hover:bg-[#1947ee]'
              }`}>
                {item.icon} {item.label}
          </Link>
        ))}
      </nav>
      <a
        href="#"
        className="absolute w-full bottom-0 bg-[#1947ee] hover:bg-[#0038fd] text-white flex items-center justify-center py-4"
      >
        <ArrowUpCircle className="mr-3" />
        Upgrade to Pro!
      </a>
    </aside>
  );
};

export default AdminSideBar;