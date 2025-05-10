import DescriptionBox from "../../Components/SA-DescriptionBox/DescriptionBox"
import "./DescriptionPage.css"
import { useSearchParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const SADescriptionPage = (requiredVals) => {
  console.log("---------------------------");
  console.log(requiredVals);
  
  console.log("---------------------------");
  
  
  
    return (
      <div className="SA-description-page">

        <div className="big-container">
          <div className="container">
            <DescriptionBox hotelInfo={requiredVals} />
          </div>
        </div>
      </div>
    )
  }    
  
  export default SADescriptionPage
  
  
