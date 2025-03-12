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
import { AdDetails } from "./components/agency/advertiser/AdDetails";
import { Screens } from "./components/agency/advertiser/Screens";
import { AdDetails2 } from "./components/agency/advertiser/AdDetails2";
import { Screens2 } from "./components/agency/advertiser/Screens2";
function App() {


  return (
    <>
      <div>
        {/* <Navbar></Navbar> */}

        <Routes>
          <Route path='/' element={<WelcomeHome />}></Route>
          <Route path='/register/:role' element={<Registration />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/specificregister' element={<SpecificRegister />}></Route>
          <Route path='/advertiser/dashboard/:id' element={<Dashboard />}></Route>
          <Route path="/ad-detail" element={<AdDetails />}></Route>
          <Route path="/ad-details2" element={<AdDetails2 />}></Route>
          <Route path='/user/dashboard' element={<User />}></Route>
          <Route path="/screenings" element={<Screens />}></Route>
          <Route path="/screenings2" element={<Screens2 />}></Route>

        </Routes>
        <ToastContainer />
      </div >
    </>
  )
}

export default App
// PANDA123!@@