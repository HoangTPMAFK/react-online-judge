import React from 'react';
import { List } from 'lucide-react';

// Status badge component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    active: {
      text: 'text-green-900',
      bg: 'bg-green-200'
    },
    suspended: {
      text: 'text-orange-900',
      bg: 'bg-orange-200'
    },
    inactive: {
      text: 'text-red-900',
      bg: 'bg-red-200'
    }
  };

  const style = statusStyles[status];
  
  return (
    <span className={`relative inline-block px-3 py-1 font-semibold ${style.text} leading-tight`}>
      <span aria-hidden className={`absolute inset-0 ${style.bg} opacity-50 rounded-full`}></span>
      <span className="relative">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    </span>
  );
};

// Simple Table Component
const SimpleTable = ({ users }) => (
  <div className="w-full mt-6">
    <p className="text-xl pb-3 flex items-center">
      <List className="mr-3" /> Simple Table
    </p>
    <div className="bg-white overflow-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Last name</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Phone</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.map((user, index) => (
            <tr key={index} className={index % 2 === 1 ? 'bg-gray-200' : ''}>
              <td className="w-1/3 text-left py-3 px-4">{user.firstName}</td>
              <td className="w-1/3 text-left py-3 px-4">{user.lastName}</td>
              <td className="text-left py-3 px-4">
                <a className="hover:text-blue-500" href={`tel:${user.phone}`}>{user.phone}</a>
              </td>
              <td className="text-left py-3 px-4">
                <a className="hover:text-blue-500" href={`mailto:${user.email}`}>{user.email}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Bordered Table Component
const BorderedTable = ({ users }) => (
  <div className="w-full mt-12">
    <p className="text-xl pb-3 flex items-center">
      <List className="mr-3" /> Bordered Table
    </p>
    <div className="bg-white overflow-auto">
      <table className="text-left w-full border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 bg-gray-50 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Name</th>
            <th className="py-4 px-6 bg-gray-50 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Last Name</th>
            <th className="py-4 px-6 bg-gray-50 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Phone</th>
            <th className="py-4 px-6 bg-gray-50 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-4 px-6 border-b border-gray-200">{user.firstName}</td>
              <td className="py-4 px-6 border-b border-gray-200">{user.lastName}</td>
              <td className="py-4 px-6 border-b border-gray-200">{user.phone}</td>
              <td className="py-4 px-6 border-b border-gray-200">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Advanced Table Component
const AdvancedTable = ({ users }) => (
  <div className="w-full mt-12">
    <p className="text-xl pb-3 flex items-center">
      <List className="mr-3" /> Advanced Table
    </p>
    <div className="bg-white overflow-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              User
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Role
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Created at
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img className="w-full h-full rounded-full" src="/api/placeholder/160/160" alt={user.name} />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{user.role}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{user.createdAt}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <StatusBadge status={user.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Main Tables Page Component
const Table = () => {
  const basicUsers = [
    { firstName: 'Lian', lastName: 'Smith', phone: '622322662', email: 'jonsmith@mail.com' },
    { firstName: 'Emma', lastName: 'Johnson', phone: '622322662', email: 'jonsmith@mail.com' },
    { firstName: 'Oliver', lastName: 'Williams', phone: '622322662', email: 'jonsmith@mail.com' },
    { firstName: 'Isabella', lastName: 'Brown', phone: '622322662', email: 'jonsmith@mail.com' }
  ];

  const advancedUsers = [
    { name: 'Vera Carpenter', role: 'Admin', createdAt: 'Jan 21, 2020', status: 'active' },
    { name: 'Blake Bowman', role: 'Editor', createdAt: 'Jan 01, 2020', status: 'active' },
    { name: 'Dana Moore', role: 'Editor', createdAt: 'Jan 10, 2020', status: 'suspended' },
    { name: 'Alonzo Cox', role: 'Admin', createdAt: 'Jan 18, 2020', status: 'inactive' }
  ];

  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">Tables</h1>
      <SimpleTable users={basicUsers} />
      <BorderedTable users={basicUsers} />
      <AdvancedTable users={advancedUsers} />
    </main>
  );
};

export default Table;