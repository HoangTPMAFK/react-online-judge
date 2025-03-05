import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p>Oops! Trang bạn tìm kiếm không tồn tại.</p>
      <Link className="text-blue-500 hover:underline" to="/">
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
