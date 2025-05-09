import React, { useState, useRef, useEffect } from 'react';
import './RewardBox.css';
import trophy from '../../Assest/trophy.png';
import { IoClose } from "react-icons/io5";

const RewardBox = ({ Reward, onRedeem }) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleRedeemClick = () => {
    setShowPopup(true);
  };

  const handleConfirm = () => {
    setShowPopup(false);
    onRedeem(Reward.id);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleCancel();
      }
    };

    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  return (
    <div className="reward-box-container">
      <div className="reward-box" onClick={handleRedeemClick}>
        <img src={Reward.TitleImage} alt={Reward.Title} className="reward-image" />
        <span className="reward-title">{Reward.Title} </span>
        <div className="reward-cost">
          {Reward.RewardCost}
          <img src={trophy} alt="trophy" className="trophy-icon" />
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box" ref={popupRef}>
            <button className="close-btn" onClick={handleCancel}>
              <IoClose />
            </button>
            <div className="popup-text">
              Are you sure you want to redeem <strong>{Reward.Title}</strong> for {Reward.RewardCost} points?
            </div>
            <div className="popup-buttons">
              <button className="popup-btn no" onClick={handleCancel}>No</button>
              <button className="popup-btn yes" onClick={handleConfirm}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardBox;