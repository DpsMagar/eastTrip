import landingPageBg from "../assets/image.png"
import MainLayout from "../components/MainLayout"
import Section1 from "./Section1"

function LandingPage() {
  return (
    <MainLayout>
      <div className='bg-[#FFF7D3] h-screen w-screen'>
        
        <div className=' absolute h-3/4 w-3/4 m-24 bg-center bg-cover  ' style={{backgroundImage: `url(${landingPageBg})`, filter: `opacity(0.4)`}}></div> 
        <Section1/>     
      </div>
    </MainLayout>
  )
}

export default LandingPage
