
import './index.css'
import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import Layout from "./components/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Form from "./pages/Form"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"
import Edits from './Edits'

export default function App(){


  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="form" element={<Form />} />
        <Route path="contact" element={<Contact />} />
        {/* <Route path="edits" element={<Edits />} /> */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
    
  
  )
}
