import React from 'react';
import './RewardBox.css';
import trophy from '../../Assest/trophy.png';

const RewardBox = ({ Reward }) => {
  return (
    <div className="reward-box">
      <img src={Reward.TitleImage} alt={Reward.Title} className="reward-image" />
      <span className="reward-title">{Reward.Title} visit</span>
      <div className="reward-cost">
        {Reward.RewardCost}
        <img src={trophy} alt="trophy" className="trophy-icon" />
      </div>
    </div>
  );
};

export default RewardBox;
