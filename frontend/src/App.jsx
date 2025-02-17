import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Public from './pages/public/Public';
import Admin from './pages/admin/Admin';

function App() {
  return (
    <Routes>
        <Route path='/*' element={<Public />}/>
        <Route path='/admin/*' element={<Admin />}/>
    </Routes>
  );
}

export default App;
