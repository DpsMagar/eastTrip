import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Logout from "./auth/Logout"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import Section1ASS from "./sections/afterSearchSection/section1ASS"
import MainLayout from "./components/MainLayout"



function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/user/login" element={<Login/>}/>
      <Route path="/user/register" element={<Register/>}/>
      <Route path="/user/logout" element={<Logout/>}/>
      <Route path="/results" element={<MainLayout> <Section1ASS/> </MainLayout>}/>
    </Routes>
  )
}

export default App
