import { useState } from "react";
import { apiRequest } from "../../../api/api";

function Register() {
  //set state variables
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [text, setText] = useState("");

  const validateForm = () => {
    let isErrors = {}; //set error object

    if (!form.username) isErrors.username = "Username is required";
    if (!form.firstName) isErrors.firstName = "First name is required";
    if (!form.lastName) isErrors.lastName = "Last name is required";
    if (!form.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
      isErrors.email = "Invalid email format";
    if (form.password.length < 8)
      isErrors.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword)
      isErrors.confirmPassword = "Passwords do not match";

    setErrors(isErrors); //save errors to state
    return Object.keys(isErrors).length === 0;
  };

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      const response = await apiRequest(
        "user/create-account",
        {
          //create account
          username: form.username,
          fname: form.firstName,
          lname: form.lastName,
          email: form.email,
          password: form.password,
          roles: ["user"],
        },
        "POST"
      );

      if (response) {
        setText("Account created successfully");
        setForm({
          //reset form
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setText("Account creation failed! Please try again.");
      }
    } catch (error) {
      setText("An error occurred. Please try again later.");
      console.log("Error:", error);
      throw error;
    }
  };

  return (
    <div className="max-w-2xl bg-white shadow-sm mx-auto">
      <div className="text-2xl p-4">Register</div>
      {text && <div className="text-red-500 text-center">{text}</div>}
      <div className="px-4 text-md font-bold text-slate-600">
        <form onSubmit={handleSubmit}>
          <div className="py-2">
            <label className="block">Username</label>
            <input
              name="username"
              type="text"
              onChange={handleOnChange}
              value={form.username}
              placeholder="Enter username"
              className="border px-2 py-2 w-full"
              required
            />
            {errors.username && (
              <div className="text-red-500">{errors.username}</div>
            )}
          </div>
          <div className="py-2">
            <label className="block">First name</label>
            <input
              name="firstName"
              type="text"
              onChange={handleOnChange}
              value={form.firstName}
              placeholder="Enter first name"
              className="border px-2 py-2 w-full"
              required
            />
            {errors.firstName && (
              <div className="text-red-500">{errors.firstName}</div>
            )}
          </div>
          <div className="py-2">
            <label className="block">Last name</label>
            <input
              name="lastName"
              type="text"
              onChange={handleOnChange}
              value={form.lastName}
              placeholder="Enter last name"
              className="border px-2 py-2 w-full"
              required
            />
            {errors.lastName && (
              <div className="text-red-500">{errors.lastName}</div>
            )}
          </div>
          <div className="py-2">
            <label className="block">Email</label>
            <input
              name="email"
              type="email"
              onChange={handleOnChange}
              value={form.email}
              placeholder="Enter email"
              className="border px-2 py-2 w-full"
              required
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
          </div>
          <div className="py-2">
            <label className="block">Password</label>
            <input
              name="password"
              type="password"
              onChange={handleOnChange}
              value={form.password}
              placeholder="Enter password"
              className="border px-2 py-2 w-full"
              required
            />
            {errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>
          <div className="py-2">
            <label className="block">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              onChange={handleOnChange}
              value={form.confirmPassword}
              placeholder="Confirm password"
              className="border px-2 py-2 w-full"
              required
            />
            {errors.confirmPassword && (
              <div className="text-red-500">{errors.confirmPassword}</div>
            )}
          </div>
          <div className="py-2">
            <button
              type="submit"
              className="bg-blue-500 text-white text-md font-medium px-4 py-2 rounded hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
