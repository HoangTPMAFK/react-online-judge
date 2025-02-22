import React, { useState } from "react";

const rolesData = [
  { id: 1, name: "Admin", permissions: ["CREATE_CONTEST", "EDIT_CONTEST"] },
  { id: 2, name: "Super Admin", permissions: ["CREATE_USER", "DELETE_USER", "EDIT_USER"] },
  { id: 3, name: "User", permissions: ["SUBMIT_CODE"] },
];

const permissionsData = [
  "CREATE_CONTEST", 
  "CREATE_PROBLEM",
  "CREATE_PERMISSION",
  "CREATE_ROLE",
  "CREATE_USER",
  "DELETE_PROBLEM",
  "DELETE_CONTEST",
  "DELETE_USER",
  "EDIT_CONTEST",
  "EDIT_USER",
  "EDIT_PROBLEM",
  "SUBMIT_CODE"
];

const PermissionManager = () => {
  const [roles, setRoles] = useState(rolesData);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handlePermissionToggle = (permission) => {
    if (!selectedRole) return;
    const updatedPermissions = selectedRole.permissions.includes(permission)
      ? selectedRole.permissions.filter((p) => p !== permission)
      : [...selectedRole.permissions, permission];

    setRoles(roles.map((role) =>
      role.id === selectedRole.id ? { ...role, permissions: updatedPermissions } : role
    ));
    setSelectedRole({ ...selectedRole, permissions: updatedPermissions });
  };

  return (
    <div className="p-6 h-screen">
      <h2 className="text-2xl font-bold mb-4">Quản lý Permission</h2>

      <div className="flex">
        <div className="w-1/3 border-r pr-4">
          <h3 className="font-semibold mb-2">Danh sách Permission</h3>
          {roles.map((role) => (
            <button
              key={role.id}
              className={`block w-full text-left px-4 py-2 rounded-lg mb-2 ${
                selectedRole?.id === role.id ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => handleRoleSelect(role)}
            >
              {role.name}
            </button>
          ))}
        </div>

        <div className="w-2/3 pl-4">
          <h3 className="font-semibold mb-2">Chỉnh sửa quyền của Role</h3>
          {selectedRole ? (
            <>
              <h4 className="mb-2 font-medium text-lg">{selectedRole.name}</h4>
              <div className="grid grid-cols-2 gap-2">
                {permissionsData.map((permission) => (
                  <label key={permission} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedRole.permissions.includes(permission)}
                      onChange={() => handlePermissionToggle(permission)}
                    />
                    <span>{permission}</span>
                  </label>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500">Chọn một Role để chỉnh sửa quyền</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PermissionManager;
