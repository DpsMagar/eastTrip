import React from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"

interface MainLayoutProps{
    children : React.ReactNode,
}

const MainLayout= ({children}: MainLayoutProps)=> {
  return (
    <div>
      <Navbar/>
        <main>{children}</main>
      <Footer/>
    </div>
  )
}

export default MainLayout
