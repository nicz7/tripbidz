import React from "react";
import metamaskIcon from '../../../Images/metamask.png';
import './walletcard.css';

const WalletCard = () => {
  return(
    <div className="content">
      <h1 className="wallet-title">Travel Wallet</h1>
      <p className="wallet-subtitle">Your Linked Payment Methods</p>

      <div className="wallet-card">
        <div className="wallet-info">
          <img src={metamaskIcon} alt="MetaMask" className="wallet-icon" />
          <div>
            <h3 className="wallet-name">MetaMask</h3>
          </div>
        </div>

        <button className="wallet-button">Connect wallet</button>

        <div className="wallet-details">
          <div>
            <strong>Wallet address:</strong>
            <p>-</p>
          </div>
          <div>
            <strong>Ether balance:</strong>
            <p>-</p>
          </div>
          <div>
            <strong>Chain:</strong>
            <p>-</p>
          </div>
          <div>
            <strong>Block Number:</strong>
            <p>-</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletCard;