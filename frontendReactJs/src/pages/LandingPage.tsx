import landingPageBg from "../assets/landing_page_bg1.png"
import MainLayout from "../components/MainLayout"
import Section1 from "./Section1"

function LandingPage() {
  return (
    <MainLayout>
      <div className=' bg-[#FFF7D3] h-screen w-auto overflow-hidden '>
        <div className=' absoulte h-3/4 w-screen  bg-center bg-cover   ' style={{backgroundImage: `url(${landingPageBg})`, filter: `opacity(0.4)`}}>
        <Section1/> 

        </div> 
      </div>
    </MainLayout>
  )
}

export default LandingPage
