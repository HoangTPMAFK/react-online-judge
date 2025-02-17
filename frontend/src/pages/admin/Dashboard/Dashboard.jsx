import React from 'react';
import { Plus, Check, List } from 'lucide-react';
import AdminSideBar from '../../../components/AdminSideBar';

const Dashboard = () => {
  const users = [
    { firstName: 'Lian', lastName: 'Smith', phone: '622322662', email: 'jonsmith@mail.com' },
    { firstName: 'Emma', lastName: 'Johnson', phone: '622322662', email: 'jonsmith@mail.com' },
    { firstName: 'Oliver', lastName: 'Williams', phone: '622322662', email: 'jonsmith@mail.com' },
    { firstName: 'Isabella', lastName: 'Brown', phone: '622322662', email: 'jonsmith@mail.com' }
  ].flatMap(user => [user, user]); // Duplicate each user to match the original table

  return (
    <main className="w-full flex-grow p-6">
        <h1 className="text-3xl text-black pb-6">Dashboard</h1>

        <div className="flex flex-wrap mt-6">
            <div className="w-full lg:w-1/2 pr-0 lg:pr-2">
            <p className="text-xl pb-3 flex items-center">
                <Plus className="mr-3" /> Monthly Reports
            </p>
            <div className="p-6 bg-white">
                {/* Chart placeholder */}
                <div className="w-full h-48 bg-gray-200 rounded"></div>
            </div>
            </div>
            <div className="w-full lg:w-1/2 pl-0 lg:pl-2 mt-12 lg:mt-0">
            <p className="text-xl pb-3 flex items-center">
                <Check className="mr-3" /> Resolved Reports
            </p>
            <div className="p-6 bg-white">
                {/* Chart placeholder */}
                <div className="w-full h-48 bg-gray-200 rounded"></div>
            </div>
            </div>
        </div>

        <div className="w-full mt-12">
            <p className="text-xl pb-3 flex items-center">
            <List className="mr-3" /> Latest Reports
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
                        <a className="hover:text-blue-500" href={`tel:${user.phone}`}>
                        {user.phone}
                        </a>
                    </td>
                    <td className="text-left py-3 px-4">
                        <a className="hover:text-blue-500" href={`mailto:${user.email}`}>
                        {user.email}
                        </a>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    </main>
  );
};

export default Dashboard;