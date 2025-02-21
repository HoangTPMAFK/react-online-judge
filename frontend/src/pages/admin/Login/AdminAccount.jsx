import React from "react";

const AdminAccount = () => {
  return (
    <div className="p-6 flex items-center h-screen justify-center">
      <div className="bg-white shadow rounded-lg p-6 flex w-full">
        <div className="w-1/3 flex flex-col items-center">
          <img
            className="w-32 h-64 rounded-full mb-4"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <input type="file" className="mb-4" />
          <button className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-100 w-full mb-2">
            Đăng xuất
          </button>
          <button className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 w-full">
            Xóa tài khoản
          </button>
        </div>
        
        <div className="w-1/2 pl-6">
          <h2 className="text-2xl font-semibold mb-4">Account</h2>
          <hr className="mb-4 border-gray-300"/>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Họ</label>
              <input className="w-full p-2 border rounded" type="text" value="Thái Phan Minh" />
            </div>
            <div>
              <label className="block text-gray-700">Tên</label>
              <input className="w-full p-2 border rounded" type="text" value="Hoàng" />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700">Email</label>
              <input className="w-full p-2 border rounded" type="email" value="hoangtpm2005@gmail.com" />
            </div>
            <div>
              <label className="block text-gray-700">Ngày sinh</label>
              <input className="w-full p-2 border rounded" type="date" value="2005-02-09" />
            </div>
          </div>
          <button className="mt-5 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 w-full">
            Cập nhật tài khoản
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAccount;
