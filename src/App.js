
import {Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ForgetPassword from './pages/ForgetPassword'
import './App.css';
import Login from './pages/Login';
import VerifyOtp from './pages/VerifyOtp';
import Merchants from './pages/Merchants';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Customers from './pages/Customers'
import AdminProfile from './pages/AdminProfile';

function App() {
  return (
   
     
     <Routes>
         <Route path='/' element={<Login />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />
         <Route path='/dashboard' element={<Dashboard />} />
         <Route path='/otpVerify' element={<VerifyOtp />} />
         <Route path='/merchants' element={<Merchants />} />
         <Route path='/customers' element={<Customers/>} />
         <Route path='/profile' element={<Profile />} />
         <Route path='/adminUsers' element={<Admin />} />
         <Route path='/adminprofile' element={<AdminProfile />} />
     </Routes>

  );
}

export default App;
