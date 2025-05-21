"use client"

export default function LoadingDots() {
  return (
    <div className="container">
      <div className="loading">
        Loading accommodation info...
        <div className="dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80vh; 
        }
        
        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #f5f5f5;
          padding: 24px;
          border-radius: 8px;
          font-family: sans-serif;
          color: #333;
          font-size: 40px; 
          font-weight: 400;
        }
        
        .dots {
          display: inline-flex;
          margin-top: 16px; 
        }
        
        .dot {
          width: 30px; 
          height: 30px;
          margin: 0 6px;
          border-radius: 50%;
          background-color: #ff7e45;
          animation: bounce 1.4s infinite ease-in-out;
        }
        
        .dot:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .dot:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0);
          }
          40% { 
            transform: scale(1.0);
          }
        }
      `}</style>
    </div>
  )
}