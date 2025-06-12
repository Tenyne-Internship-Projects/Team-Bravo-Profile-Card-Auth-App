import React from 'react';
import { Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import Signin from './pages/Signin';
import Emailverify from './pages/Emailverify';
import Resetpswd from './pages/Resetpswd';
import Register from './pages/Register';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/email-verify' element={< Emailverify/>} />
        <Route path='/reset-password' element={< Resetpswd />} />
        <Route path='/register' element={< Register/>} />
      </Routes>
    </>
  )
}

export default App