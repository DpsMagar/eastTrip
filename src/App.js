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
import { Homepage } from './Page/Travel-agent-home-page/Homepage';
import FormPage from './Page/Travel-agent-form/FormPage';
import { FormProvider } from './context/FormContext';
import TLogin from './Components/TLogin/TLogin';
import TSignUp from './Components/T-SignUp/TSignUp';
import ForgetPassword from './Components/T-ForgetPassword/ForgetPassword';
import SALogin from "./Page/SA-LoginPage/SALogin"
import SAHomePage from "./Page/SA-HomePage/SAHomePage"
import Result3 from "./Components/ResultBox/Result3"
import Result2 from "./Components/ResultBox/Result2"
import EsewaForm from "./Page/payment/EsewaForm"
import Payment   from "./Page/payment/PaymentFailure"
import Success from "./Page/payment/PaymentSuccess"
import KhaltiPayment from "./Page/payment/KhaltiPayment"
import EsewaPayment from "./Page/payment/EsewaPayment"
import PaymentSuccess from "./Page/payment/PaymentSuccess"
import PaymentFailure from "./Page/payment/PaymentFailure"
function App() {
  return (
    <div className="Main">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Routes with Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/workingpage" element={<DescriptionPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/search2" element={<TwoSearch />} />
              <Route path="/description" element={<DescriptionPage />} />
              <Route path="/profile" element={<DashBoard />} />
              <Route path="/result" element={<Result />} />


              <Route path="/pay" element={<Payment />} />
              <Route path="/khalti" element={<KhaltiPayment />} />
              <Route path="/success" element={<Success />} />
              <Route path="/e-payment" element={<EsewaPayment />} />

              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-failure" element={<PaymentFailure />} />



              
              
              {/* Travel Agent Routes */}
              <Route path="/travelagent" element={<Homepage />} />
              <Route path="/travelagent/login" element={<TLogin />} />
              <Route path="/travelagent/signup" element={<TSignUp />} />
              <Route path="/travelagent/forgot-password" element={<ForgetPassword />} />
              <Route path="/travelagentform" element={
                <FormProvider> 
                  <FormPage />
                </FormProvider>
              } />
            </Route>

            {/* Super Admin Routes (without Layout) */}
            <Route path="/superadmin" element={<SALogin />} />
            <Route path="/superadminhomepage" element={<SAHomePage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App