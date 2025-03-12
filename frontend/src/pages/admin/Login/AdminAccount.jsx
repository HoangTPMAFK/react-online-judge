import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { apiRequest, getCookie } from "../../../api/api";
import { xorEncryptDecrypt, logout } from "../../../api/auth";

const AdminAccount = ({ accountInfo }) => {
  const [day, setDay] = useState("2005-02-09");
  const [account, setAccount] = useState({});

  useEffect(() => {
    if (accountInfo) {
      setAccount(accountInfo);
    }
    console.log(accountInfo);
  }, []);

  const handleDateChange = (event) => {
    setDay(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!account.id) {
      console.error("Account ID is missing!");
      return;
    }

    console.log("Submitting account data:", account);
    apiRequest(`user/my-profile/`, account, "PUT")
    .then(
      response => {
        localStorage.setItem(
          "account", 
          btoa( 
            xorEncryptDecrypt(
              JSON.stringify(response.data),
              localStorage.getItem("loginTime")
            )
          )
        );
      })
    .catch(err => console.error(err))
  };
  const logout = async () => {
    try {
      alert(1)
      const response = await fetch(`http://localhost:8080/contest-programing/api/auth/logout`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `${getCookie("token")}` // Include token
        },
      });      
      const jsonData = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}.`);
      }
      alert(jsonData.message)
      logout("admin");
    } catch (error) {
      console.error("Error updating account:", error);
    }
  }
  const deleteAccount = async () => {
    if (prompt("Are you sure to want to delete account? Type DELETE to delete your account") == "DELETE")
      try {
        const response = await fetch(`http://localhost:8080/contest-programing/api/auth/delete-account`, {
          method: "POST",
          headers: { 
            "Authorization": `Bearer ${getCookie("token")}` // Include token
          },
        });      

        const jsonData = await response.json();
        if (!response.ok) {
          alert(jsonData.message)
          deleteCookie("token");
          throw new Error(`HTTP error! Status: ${response.status}.`);
        } else {
          alert(jsonData.message)
          deleteCookie("token");
        }
      } catch (error) {
        console.error("Error updating account:", error);
      }
  }

  return (
    <div className="p-6 flex items-center h-screen justify-center">
      <form onSubmit={(e) => submitHandler(e)} className="bg-white shadow rounded-lg p-6 flex w-full">
        {/* Avatar và hành động */}
        <div className="w-1/3 flex flex-col items-center">
          <img
            className="w-32 h-64 rounded-full mb-4"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <input type="file" className="mb-4" />
          <button type="button" className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-100 w-full mb-2" onClick={logout}>
            Đăng xuất
          </button>
          <button type="button" className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 w-full" onClick={deleteAccount}>
            Xóa tài khoản
          </button>
        </div>

        {/* Form nhập thông tin */}
        <div onSubmit={submitHandler} className="w-1/2 pl-6">
          <h2 className="text-2xl font-semibold mb-4">Account</h2>
          <hr className="mb-4 border-gray-300" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Họ</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={account?.lname || ""}
                onChange={(e) => setAccount({ ...account, lname: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700">Tên</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={account?.fname || ""}
                onChange={(e) => setAccount({ ...account, fname: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700">Email</label>
              <input
                className="w-full p-2 border rounded"
                type="email"
                value={account?.email || ""}
                onChange={(e) => setAccount({ ...account, email: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700">Old password</label>
              <input
                className="w-full p-2 border rounded"
                type="password"
                onChange={(e) => setAccount({ ...account, password: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700">New password</label>
              <input
                className="w-full p-2 border rounded"
                type="password"
                onChange={(e) => setAccount({ ...account, newPassword: e.target.value })}
                placeholder="Blank if you don't need to reset password"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700">Type new password again</label>
              <input
                className="w-full p-2 border rounded"
                type="password"
                onChange={(e) => setAccount({ ...account, confirmPassword: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700">Ngày sinh</label>
              <input
                className="w-full p-2 border rounded"
                type="date"
                value={new Date(account?.dob || 0).toISOString().split("T")[0]}
                onChange={e => setAccount({ ...account, dob: e.target.value })}
              />
            </div>
          </div>
          <button type="submit" className="mt-5 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 w-full">
            Cập nhật tài khoản
          </button>
        </div>
      </form>
    </div>
  );
};

AdminAccount.propTypes = {
  accountInfo: PropTypes.object,
};

AdminAccount.defaultProps = {
  accountInfo: {},
};

export default AdminAccount;
