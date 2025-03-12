import React, { useEffect, useRef, useState } from "react";
import { introspect, xorEncryptDecrypt, logout } from "../../../api/auth";
import { getCookie } from "../../../api/api";

const Account = () => {
  const dob = useRef("2005-09-02");
  const [account, setAccount] = useState([]);

  useEffect(() => {
    setAccount(JSON.parse(xorEncryptDecrypt(atob(localStorage.getItem("account")), localStorage.getItem("loginTime"))))
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitting account data:", account);
    apiRequest(`user/my-profile/`, account, "PUT")
    .then(
      response => {
        setAccount(response.data)
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
      const response = await fetch(`http://localhost:8080/contest-programing/api/auth/logout`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getCookie("token")}` // Include token
        },
      });
      const jsonData = await response.json();
      alert(jsonData.message)
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}.`);
      }
      logout("USER");
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
          logout("USER")
          throw new Error(`HTTP error! Status: ${response.status}.`);
        } else {
          alert(jsonData.message)
          logout("USER")
        }
      } catch (error) {
        console.error("Error updating account:", error);
      }
  }

  return (
    <form className="p-6 flex items-center h-screen justify-center" onSubmit={(e) => submitHandler(e)}>
      <div className="bg-white shadow rounded-lg p-6 flex w-full">
        <div className="w-1/3 flex flex-col items-center">
          <img className="w-32 h-64 rounded-full mb-4" src="https://via.placeholder.com/150" alt="Profile" />
          <input type="file" className="mb-4" />
          <button type="button" className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-100 w-full mb-2" onClick={logout}>
            Đăng xuất
          </button>
          <button type="button" className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 w-full" onClick={deleteAccount}>
            Xóa tài khoản
          </button>
        </div>

        <div className="w-1/2 pl-6 mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Account</h2>
          <hr className="mb-4 border-gray-300" />
          <div className="col-span-2">
            <label className="block text-gray-700">Username</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={account.username || ""}
              onChange={(e) => setAccount({ ...account, username: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Họ</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={account.lname || ""}
                onChange={(e) => setAccount({ ...account, lname: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700">Tên</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={account.fname || ""}
                onChange={(e) => setAccount({ ...account, fname: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700">Email</label>
              <input
                className="w-full p-2 border rounded"
                type="email"
                value={account.email || ""}
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
                placeholder="Plank if you don't need to reset password"
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
                defaultValue={dob.current}
                ref={dob}
                onChange={(e) => setAccount({ ...account, dob: e.target.value })}
              />
            </div>
          </div>
          <button type="submit" className="mt-5 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 w-full focus:bg-blue-900">
            Cập nhật tài khoản
          </button>
        </div>
      </div>
    </form>
  );
};

export default Account;
