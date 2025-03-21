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
import { BrowseAds } from "./components/user/BrowseAds";
import { AdDetails2 } from "./components/agency/advertiser/AdDetails2";
import { Screens2 } from "./components/agency/advertiser/Screens2";
import { BookingAds } from "./components/user/BookingAds";
import { ViewDetails } from "./components/user/ViewDetails";
import { ManageBookings } from "./components/agency/advertiser/ManageBookings";
import SavedAds from "./components/user/SavedAds";
import { AdvertiserProfile } from "./components/agency/advertiser/profile/AdvertiserProfile";
import { PersonalInfo } from "./components/agency/advertiser/profile/PersonalInfo";
import { ChangePassword } from "./components/agency/advertiser/profile/ChangePassword";
import { AdvertiserLogout } from "./components/agency/advertiser/profile/AdvertiserLogout";

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
          <Route path="/managebookings" element={<ManageBookings />}></Route>
          <Route path="/ad-detail" element={<AdDetails />}></Route>
          <Route path="/ad-details2" element={<AdDetails2 />}></Route>
          <Route path="/advertiserprofile" element={<AdvertiserProfile />}>
            <Route path="profile" element={<PersonalInfo />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="logout" element={<AdvertiserLogout />} />
          </Route>
          <Route path='/user/dashboard' element={<User />}></Route>
          {/* <Route path='/browseads' element={<BrowseAds/>}></Route> */}
          <Route path="/browseads" element={<BrowseAds />}></Route>
          <Route path="/viewdetails/:id" element={<ViewDetails />}></Route>
          <Route path="/bookings/:id" element={<BookingAds />}></Route>
          <Route path="/screenings" element={<Screens />}></Route>
          <Route path="/screenings2" element={<Screens2 />}></Route>
          <Route path="/saved-ads" element={<SavedAds />}></Route>

        </Routes>
        <ToastContainer />
      </div >
    </>
  )
}

export default App
// PANDA123!@@