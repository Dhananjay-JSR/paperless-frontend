import React,{useState} from 'react'
import Home from './component/Home'
import {  Routes, Route } from "react-router-dom";
import Boilerplate from './component/Boilerplate';
import DarkMode from './context/Theme/ThemeContext';


function App() {
  const [enable, setenable] = useState(true)
  return (
    <>
     <DarkMode.Provider value={[enable,setenable]}>
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path=":id" element={<Boilerplate/>} />
    </Routes>
    </DarkMode.Provider>
    </>
  )
}

export default App