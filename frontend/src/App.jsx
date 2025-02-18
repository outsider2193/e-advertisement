import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Registration from './components/Registration'
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from './components/Navbar';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar></Navbar>

        <Routes>
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