import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Public from './pages/public/Public';
import Admin from './pages/admin/Admin';
import Superadmin from './pages/superadmin/SuperAdmin';

function App() {
  return (
    <Routes>
        <Route path='/*' element={<Public />}/>
        <Route path='/admin/*' element={<Admin />}/>
        <Route path='/superadmin/*' element={<Superadmin />}/>
    </Routes>
  );
}

export default App;
