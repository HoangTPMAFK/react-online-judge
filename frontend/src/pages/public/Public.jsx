import { Link, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Problem from './Problems/Problem';
import Contest from './Contest/Contest';
import Rank from './Rank/Rank';
import ProblemDetail from './Problems/ProblemDetail';
import Register from './Register/Register';
import Login from './Login/Login';
import ContestDetail from './Contest/ContestDetail';
import User from './User/User';

function Public() {
  return (
    <div className="min-w-[860px]">
      <nav className="flex flex-row justify-between font-medium text-xl border-b shadow-md px-4">
        <div className="flex flex-row items-center">
          <img
            className="h-16 w-16 cursor-pointer"
            src={'/logo512.png'}
            onClick={() => (window.location.href = `/`)}
          />
          <ul className="px-4 flex flex-row">
            <li>
              <Link to="/" className="px-4">
                Home
              </Link>
            </li>
            <li>
              <Link to="/problem" className="px-4">
                Problems
              </Link>
            </li>
            <li>
              <Link to="/contest" className="px-4">
                Contests
              </Link>
            </li>
            <li>
              <Link to="/rank" className="px-4">
                Rank
              </Link>
            </li>
          </ul>
        </div>

        <ul className="px-4 flex flex-row items-center">
          <li>
            <Link to="/login" className="px-4">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="px-4">
              Register
            </Link>
          </li>
        </ul>
      </nav>
      <div className="bg-slate-50 py-12">
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="problem" element={<Problem />} />
            <Route path="contest" element={<Contest />} />
            <Route path="contest/1" element={<ContestDetail />} />
            <Route path="rank" element={<Rank />} />
            <Route path="problem/1" element={<ProblemDetail />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="user/1" element={<User />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Public;
