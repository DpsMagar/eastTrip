import "./PlaneDetail.css"
import { IoClose } from "react-icons/io5"
import { MdEventSeat } from "react-icons/md"

const PlaneDetail = (props) => {
  const { SeatNumber, flightLogo, onClose } = props

  const renderColumnNumbers = () => {
    const numbers = []
    for (let i = 1; i <= 10; i++) {
      numbers.push(
        <div key={i} className="column-number">
          {i}
        </div>,
      )
    }
    return numbers
  }

  const renderRow = (rowLetter) => {
    const seats = []
    for (let i = 1; i <= 10; i++) {
      const seatId = `${rowLetter}${i}`.toLowerCase()
      seats.push(
        <div
          key={seatId}
          className={`seat ${SeatNumber?.toLowerCase() === seatId ? "selected" : ""}`}
          title={`${rowLetter}${i}`}
        >
          <MdEventSeat size={24} />
          <span className="seat-label">{rowLetter}</span>
        </div>,
      )
    }
    return seats
  }

  return (
    <div className="plane-box">
      <div className="plane-box-header">
        <div className="logo">
          <img src={flightLogo} alt="plane-logo" />
        </div>
        <h1>Plane Detail</h1>
        <button className="close-button" onClick={onClose}>
          <IoClose />
        </button>
      </div>

      <div className="plane-box-body">
        <h4>Seat: {SeatNumber}</h4>
        <div className="plane">
          <div className="seat-grid">
            <div className="row-label empty"></div>
            {renderColumnNumbers().map((number, index) => (
              <div key={`col-${index}`} className="column-number">
                {number}
              </div>
            ))}

            <div className="row-label">A</div>
            {renderRow("A").map((seat, index) => (
              <div key={`A-${index}`} className="seat-cell">
                {seat}
              </div>
            ))}

            <div className="row-label empty"></div>
            <div className="aisle" colSpan="10"></div>

            <div className="row-label">B</div>
            {renderRow("B").map((seat, index) => (
              <div key={`B-${index}`} className="seat-cell">
                {seat}
              </div>
            ))}

            <div className="row-label">C</div>
            {renderRow("C").map((seat, index) => (
              <div key={`C-${index}`} className="seat-cell">
                {seat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaneDetail