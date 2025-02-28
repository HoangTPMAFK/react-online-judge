import React, { useEffect, useRef, useState } from "react";

const Account = () => {
  const dob = useRef("2005-09-02");
  const [account, setAccount] = useState({ lname: "", fname: "", email: "" });

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      let [key, value] = cookie.split("=");
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }

  useEffect(() => {
    async function introspect() {
      try {
        const response = await fetch("http://localhost:8080/contest-programing/api/auth/introspect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: getCookie("token") }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}.`);
        }

        const jsonData = await response.json();
        if (!jsonData.data.valid) {
          deleteCookie("token");
          window.location.href = "/login";
        }
        setAccount(jsonData.data.account);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    introspect();
  }, []);

  const submitHandler = async (e) => {
    // e.preventDefault();

    if (!account.id) {
      console.error("Account ID is missing!");
      return;
    }

    console.log("Submitting account data:", account);

    try {
      const response = await fetch(`http://localhost:8080/contest-programing/api/user/my-profile/`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getCookie("token")}` // Include token
        },
        body: JSON.stringify(account),
      });      

      const jsonData = await response.json();
      if (!response.ok) {
        alert(jsonData.message)
        throw new Error(`HTTP error! Status: ${response.status}.`);
      }

      console.log("Updated account successfully:", jsonData);
      setAccount(jsonData.data);
    } catch (error) {
      console.error("Error updating account:", error);
    }
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
      deleteCookie("token");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}.`);
      }
      window.location.href = "/login";
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
    <form className="p-6 flex items-center h-screen justify-center" onSubmit={submitHandler}>
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
              readOnly
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
