import React, { useState, useRef, useEffect } from 'react';
import './RewardBox.css';
import trophy from '../../Assest/trophy.png';
import { IoClose } from "react-icons/io5";

const RewardBox = ({ Reward, value }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // Breadcrumb message
  const popupRef = useRef(null);

  const userId = sessionStorage.getItem("userId");

  const handleRedeemClick = () => {
    setShowPopup(true);
    setMessage(null); // Reset previous messages
  };

  const redeemPoints = async () => {
    // Frontend check: user must have enough points
    if (value < Reward.RewardCost) {
      setMessage("You don't have enough points to redeem this reward.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await fetch(
        `http://localhost:8080/api/user-points/redeem?userId=${userId}&pointsToRedeem=${Reward.RewardCost}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage("Reward successfully redeemed!");
    } catch (err) {
      setMessage("Failed to redeem reward. Please try again.");
    } finally {
      setLoading(false);
      setShowPopup(false);
    }
  };

  const handleConfirm = () => {
    redeemPoints();
  };

  const handleCancel = () => {
    setShowPopup(false);
    setMessage(null);
  };

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
        <span className="reward-title">{Reward.Title}</span>
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
              <button className="popup-btn no" onClick={handleCancel} disabled={loading}>No</button>
              <button className="popup-btn yes" onClick={handleConfirm} disabled={loading}>
                {loading ? 'Redeeming...' : 'Yes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {message && (
        <div className="breadcrumb-message">
          {message}
        </div>
      )}
    </div>
  );
};

export default RewardBox;
