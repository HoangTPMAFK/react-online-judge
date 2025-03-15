import "./App.css";
import { Route, Routes } from "react-router-dom";
import Public from "./pages/public/Public";
import Admin from "./pages/admin/Admin";
import Superadmin from "./pages/superadmin/SuperAdmin";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login/Login";
import SuperAdminLogin from "./pages/superadmin/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Public />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/admin/login" element={<AdminLogin />}/>
      <Route path="/superadmin/*" element={<Superadmin />} />
      <Route path="/superadmin/login" element={<SuperAdminLogin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
