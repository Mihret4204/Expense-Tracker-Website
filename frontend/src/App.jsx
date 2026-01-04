import Layout from "./components/Layout";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddTransaction from "./pages/AddTransaction.jsx";
import History from "./pages/History.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Login from "./pages/Login.jsx";
import './styles/styles.css';


import { BrowserRouter, Routes, Route } from "react-router-dom";
function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route  element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/add-transaction" element={<AddTransaction/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    
    
     
  )
};

export default App;