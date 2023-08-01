
import { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes,Route } from 'react-router'
import Cards from './pages/Cards'
import Countries from './pages/Countries'
import Navbar from "./components/Navbar";
import { CountryProvider } from "./context/CountryContext";
import { CardDataProvider } from "./context/CardDataContext";
import "./styles/App.css"
import { AnimatePresence } from "framer-motion";



function App() {

  return (
   <CountryProvider>
    <CardDataProvider>
    <AnimatePresence>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Cards/>}/>
        <Route path="/countries" element={<Countries/>}/>
      </Routes>
    </Router>
    </AnimatePresence>
    </CardDataProvider>
    </CountryProvider>
  )
}

export default App
