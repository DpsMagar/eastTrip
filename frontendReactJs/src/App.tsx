import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Logout from "./auth/Logout"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"



function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/user/login" element={<Login/>}/>
      <Route path="/user/register" element={<Register/>}/>
      <Route path="/user/logout" element={<Logout/>}/>
    </Routes>
  )
}

export default App
