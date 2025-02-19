import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Registration from './components/pages/Registration'
import Login from './components/pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from './components/Navbar';
import { WelcomeHome } from './components/pages/WelcomeHome';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar></Navbar>

        <Routes>
          <Route path='/' element={<WelcomeHome/>}></Route>
          <Route path='/register' element={<Registration />}></Route>
          <Route path='/login' element={<Login />}></Route>

        </Routes>
        <ToastContainer />
      </div >
    </>
  )
}

export default App
// PANDA123!@@