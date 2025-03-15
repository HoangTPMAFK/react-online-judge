import React, { useEffect, useRef, useState } from "react";
import { introspect, xorEncryptDecrypt, logout } from "../../../api/auth";
import { apiRequest, getCookie } from "../../../api/api";

const SuperAdminAccount = () => {
  const dob = useRef("2005-09-02");
  const [account, setAccount] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null); // State mới để lưu file avatar
  const [wrongPassword, setWrongPassword] = useState(false);

  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      const decryptedAccount = JSON.parse(
        xorEncryptDecrypt(atob(storedAccount), localStorage.getItem("loginTime"))
      );
      setAccount(decryptedAccount);
      setAvatarPreview(decryptedAccount.avatar); // Hiển thị avatar cũ
    } 
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("data", JSON.stringify(account));

    if (avatarFile) {
      formData.append("file", avatarFile);
    }
    for (var it of formData.entries()) {
      console.log(it[0]+": "+it[1]);
    }

    try {
      const response = await apiRequest("user/my-profile/", formData, "PUT", true);
      setAccount(response.data);
      localStorage.setItem(
        "account",
        btoa(
          xorEncryptDecrypt(JSON.stringify(response.data), localStorage.getItem("loginTime"))
        )
      );
    } catch (err) {
      console.error("Lỗi khi cập nhật hồ sơ:", err);
    }
  };

  const logoutAccount = async () => {
    try {
      const response = await fetch("http://localhost:8080/contest-programing/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      const jsonData = await response.json();
      alert(jsonData.message);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}.`);
      }
      logout("superadmin");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      setWrongPassword(true);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="p-6 flex items-center h-screen justify-center" onSubmit={(e) => submitHandler(e)}>
      <div className="bg-white shadow rounded-lg p-6 flex w-full">
        <div className="w-1/3 flex flex-col items-center">
          <img className="w-40 h-40 rounded-full mb-4" src={avatarPreview ? `http://localhost:8080/contest-programing/${avatarPreview}` : `http://localhost:8080/contest-programing/${account.avatar}`} alt="Profile" />
          <input type="file" className="mb-4" onChange={(e) => handleAvatarChange(e)}/>
          <button type="button" className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-100 w-full mb-2" onClick={logoutAccount}>
            Đăng xuất
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
              {wrongPassword && <div className="text-red-600">Wrong password</div>}
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

export default SuperAdminAccount;
