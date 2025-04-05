import DescriptionBox from "../../Components/DescriptionBox/DescriptionBox"
import "./DescriptionPage.css"
const DescriptionPage = () => {
    // Sample data with the structure provided
    var dumby = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Estadio_Santiago_Bernabéu_Madrid.jpg"
    const hotel_info = {
      Name: "Pokhreli Homestay",
      location: "Pokhara",
      attraction: "Falls inside Ghandruk Village",
      rating: 4,
      roomFeatures: ["Private Bathroom", "Aesthetic Lighting"],
      price: 2800,
      extraInfo: "10% offer of New Year",
      homeStayFeatures: ["Local foods", "Yoga & Meditation Sessions", "24/7 Customer Support"],
      description:
        "Nestled in the heart of Kathmandu, Hotel Himalayan Bliss offers a blend of modern comfort and traditional Nepalese charm. Guests can enjoy spacious rooms with stunning views of the surrounding mountains and cityscape. With exceptional hospitality and a range of amenities, it's the perfect retreat for and exploration.",
      "Main-Image": dumby,
      "extra-image": [dumby, dumby, dumby, dumby],
      reviews: [
        {
          name: "Hinata",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          rating: 5,
          date: "2 days ago",
          comment:
            "Amazing experience! The staff was incredibly helpful and the facilities were top-notch. Will definitely return.",
        },
        {
          name: "Akainu",
          avatar: "https://randomuser.me/api/portraits/men/22.jpg",
          rating: 4,
          date: "1 week ago",
          comment:
            "Great location and beautiful rooms. The breakfast buffet was excellent. Only minor issue was the slow check-in process.",
        },
      ],
    }
  
    return (
      <div className="description-page">
        <div className="container">
          <DescriptionBox hotelInfo={hotel_info} />
        </div>
      </div>
    )
  }
  
  export default DescriptionPage
  
  
