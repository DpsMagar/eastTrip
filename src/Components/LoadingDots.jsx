"use client"

export default function LoadingDots() {
  return (
    <div className="loading">
      Loading accommodation info...
      <div className="dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <style jsx>{`
        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f5f5f5;
          padding: 16px;
          border-radius: 4px;
          font-family: sans-serif;
          color: #333;
          font-weight:400
        }
        
        .dots {
          display: inline-flex;
          margin-left: 8px;
        }
        
        .dot {
          width: 40px;
          height: 40px;
          margin: 0 3px;
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
