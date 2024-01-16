import React,{useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
function App() {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Dashboard 
            />} />
            {/* <Route path="/login" element={<SignInModal />} /> */}
        </Routes>
      </Router>
    )
}

export default App
