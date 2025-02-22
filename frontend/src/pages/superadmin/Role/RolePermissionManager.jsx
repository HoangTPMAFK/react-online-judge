import React, { useState } from "react";
import DataTable from "react-data-table-component";

const RolePermissionManager = () => {
    const [roles, setRoles] = useState([
        { id: 1, name: "SUPER_ADMIN", permissions: 10 },
        { id: 2, name: "ADMIN", permissions: 6 },
        { id: 3, name: "USER", permissions: 3 }
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState(null);
    const [roleName, setRoleName] = useState("");

    const handleEdit = (role) => {
        setCurrentRole(role);
        setRoleName(role.name);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setRoles(roles.filter(role => role.id !== id));
    };

    const handleSave = () => {
        if (currentRole) {
            setRoles(roles.map(role => role.id === currentRole.id ? { ...role, name: roleName } : role));
        } else {
            setRoles([...roles, { id: roles.length + 1, name: roleName, permissions: 0 }]);
        }
        setIsModalOpen(false);
        setRoleName("");
        setCurrentRole(null);
    };

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true },
        { name: "Name", selector: row => row.name, sortable: true },
        { name: "Number", selector: row => row.permissions, sortable: true },
        {
            name: "Action",
            cell: row => (
                <div>
                    <button className="bg-blue-500 text-white px-3 py-2 rounded mr-2" onClick={() => handleEdit(row)}>Edit</button>
                    <button className="bg-red-500 text-white px-3 py-2 rounded" onClick={() => handleDelete(row.id)}>Delete</button>
                </div>
            )
        }
    ];

    return (
        <div className="p-6 h-screen mx-auto w-full">
            <h2 className="text-xl font-bold mb-4">Quản lý Vai Trò</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={() => setIsModalOpen(true)}>+ Thêm Vai Trò</button>
            
            <DataTable columns={columns} data={roles} pagination />

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-bold mb-2">{currentRole ? "Chỉnh sửa Vai Trò" : "Thêm Vai Trò"}</h3>
                        <input
                            className="border p-2 w-full mb-4"
                            type="text"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            placeholder="Nhập tên vai trò"
                        />
                        <div className="flex justify-end space-x-4">
                            <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>Hủy</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Lưu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RolePermissionManager;
