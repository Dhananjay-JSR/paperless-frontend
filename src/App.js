import React from 'react'
import Home from './component/Home'
import { BrowserRouter,Switch, Routes, Route } from "react-router-dom";
import Boilerplate from './component/Boilerplate';
import {createContext} from 'react';

const Theme =  createContext();

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path=":id" element={<Boilerplate/>} />
    </Routes>
    </>
  )
}

export default App