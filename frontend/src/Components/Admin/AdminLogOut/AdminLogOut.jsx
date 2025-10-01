import React from 'react';
import './AdminLogOut.css';

const AdminLogOut = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <h2>Are you sure you want to log out?</h2>
        <p>After you log out, your account data will remain safe. You can log in again anytime.</p>
        
        <div className="logout-modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="logout-btn" onClick={onConfirm}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogOut;