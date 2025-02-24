import { Routes, Route } from "react-router-dom";
import Registration from './components/pages/Registration'
import Login from './components/pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from './components/Navbar';
import { WelcomeHome } from './components/pages/WelcomeHome';
import { SpecificRegister } from './components/pages/SpecificRegister';
import { User } from './components/user/User';
import { Dashboard } from './components/agency/advertiser/Dashboard';
function App() {


  return (
    <>
      <div>
        <Navbar></Navbar>

        <Routes>
          <Route path='/' element={<WelcomeHome />}></Route>
          <Route path='/register/:role' element={<Registration />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/specificregister' element={<SpecificRegister />}></Route>
          <Route path='/advertiser/dashboard/:id' element={<Dashboard />}></Route>
          <Route path='/user/dashboard' element={<User />}></Route>

        </Routes>
        <ToastContainer />
      </div >
    </>
  )
}

export default App
// PANDA123!@@