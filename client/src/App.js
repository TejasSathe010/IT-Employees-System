import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Employee from './components/Employee';
import Category from './components/Category';
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddCategory from './components/AddCategory';
 
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/adminlogin' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='' element={<Home />} />
            <Route path='/dashboard/employee' element={<Employee />} />
            <Route path='/dashboard/category' element={<Category />} />
            <Route path='/dashboard/profile' element={<Profile />} />
            <Route path='/dashboard/add_category' element={<AddCategory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
