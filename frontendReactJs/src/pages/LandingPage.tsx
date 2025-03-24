import landingPageBg from "../assets/landing_page_bg1.png"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import MainLayout from "../components/MainLayout"
import Section1 from "./Section1"

function LandingPage() {


  return (
    <MainLayout>
      <Login/>
      <Register/>
      <div className=' bg-[#FFF7D3] h-screen w-auto overflow-hidden ' style={{backgroundImage: `url(${landingPageBg})`, filter: `opacity(0.4) `}}>
        <Section1/> 
        
      </div>
    </MainLayout>
  )
}

export default LandingPage
