import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Layout from "./Components/Layout/Layout"
import Home from "./Page/Home/Home"
import Box from "./Components/Boxcard/Box"
import SearchPage from "./Page/SearchPage/SearchPage"
import TwoSearch from "./Components/Search2/TwoSearch"
import DescriptionPage from "./Page/DescriptionPage/DescriptionPage"
import DashBoard from "./Page/DashBoard/DashBoard"
import Result from "./Components/ResultBox/PlaneResult"
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/workingpage" element={<DescriptionPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search2" element={<TwoSearch />} />
            <Route path="/description" element={<DescriptionPage />} />
            <Route path="/profile" element={<DashBoard />} />
            <Route path="/result" element={<Result />} />
            
          </Route>
          
        </Routes>

      </Router>
    </AuthProvider>


  )
}

export default App

