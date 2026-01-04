import Layout from "./components/Layout";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route  element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    
    
     
  )
};

export default App;