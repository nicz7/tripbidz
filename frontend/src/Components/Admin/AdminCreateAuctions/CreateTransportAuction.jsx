import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Calendar, 
  Clock, 
  MapPin, 
  Car,
  Save,
  Timer
} from 'lucide-react';
import './CreateTransportAuction.css';

const CreateTransportAuction = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    // Basic transport information matching table structure
    service: '',
    location: '',
    date: '',         // Changed from startDate/endDate to single date field
    type: '',
    startingPrice: '',
    description: '',
    image: null,
    status: 'active',
    // Bidding timing fields
    bidStartDate: '',
    bidStartTime: '',
    bidEndDate: '',
    bidEndTime: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const transportTypes = [
    'Car Rental',
    'Private Taxi',
    'Luxury Car',
    'Bus',
    'Van',
    'Motorcycle',
    'Bicycle',
    'Boat',
    'Train',
    'Helicopter',
    'Charter Bus',
    'Shuttle Service',
    'Airport Transfer',
    'City Tour',
    'Road Trip'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate bidding duration
  const calculateBiddingDuration = () => {
    if (!formData.bidStartDate || !formData.bidStartTime || !formData.bidEndDate || !formData.bidEndTime) {
      return null;
    }
    
    const startDateTime = new Date(`${formData.bidStartDate}T${formData.bidStartTime}`);
    const endDateTime = new Date(`${formData.bidEndDate}T${formData.bidEndTime}`);
    const timeDiff = endDateTime - startDateTime;
    
    if (timeDiff <= 0) return 'Invalid duration';
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // Get bidding status
  const getBiddingStatus = () => {
    if (!formData.bidStartDate || !formData.bidStartTime || !formData.bidEndDate || !formData.bidEndTime) {
      return { status: 'not-set', text: 'Not set', color: '#6b7280' };
    }
    
    const now = new Date();
    const startDateTime = new Date(`${formData.bidStartDate}T${formData.bidStartTime}`);
    const endDateTime = new Date(`${formData.bidEndDate}T${formData.bidEndTime}`);
    
    if (now < startDateTime) {
      return { status: 'upcoming', text: 'Upcoming', color: '#2563eb' };
    } else if (now >= startDateTime && now <= endDateTime) {
      return { status: 'active', text: 'Active', color: '#16a34a' };
    } else {
      return { status: 'ended', text: 'Ended', color: '#dc2626' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate bidding times
      if (!formData.bidStartDate || !formData.bidStartTime || !formData.bidEndDate || !formData.bidEndTime) {
        alert('Please set both start and end times for bidding.');
        setIsSubmitting(false);
        return;
      }

      const bidStartDateTime = new Date(`${formData.bidStartDate}T${formData.bidStartTime}`);
      const bidEndDateTime = new Date(`${formData.bidEndDate}T${formData.bidEndTime}`);
      
      if (bidStartDateTime >= bidEndDateTime) {
        alert('Bid end time must be after bid start time.');
        setIsSubmitting(false);
        return;
      }

      // Validate transport date
      if (!formData.date) {
        alert('Please select a date for the transport service.');
        setIsSubmitting(false);
        return;
      }

      // Create new auction object
      const newAuction = {
        id: Date.now(), // Simple ID generation
        title: formData.service, // Using service as title for compatibility
        category: 'Transportation',
        service: formData.service,
        location: formData.location,
        date: formData.date,
        type: formData.type,
        price: `${formData.startingPrice} ETH`,
        startingPrice: formData.startingPrice,
        bids: 0,
        img: imagePreview || '/api/placeholder/300/200',
        description: formData.description,
        status: 'active',
        createdAt: new Date().toISOString(),
        // Bidding timing
        bidStartDate: formData.bidStartDate,
        bidStartTime: formData.bidStartTime,
        bidEndDate: formData.bidEndDate,
        bidEndTime: formData.bidEndTime,
        bidStartDateTime: bidStartDateTime.toISOString(),
        bidEndDateTime: bidEndDateTime.toISOString(),
        biddingDuration: calculateBiddingDuration(),
        biddingStatus: getBiddingStatus()
      };

      // Call the onSave function passed from parent
      onSave(newAuction);
    } catch (error) {
      console.error('Error creating auction:', error);
      alert('Error creating auction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const biddingStatus = getBiddingStatus();

  return (
    <div className="create-auction-overlay">
      <div className="create-auction-modal">
        <div className="modal-header">
          <div className="header-title">
            <div>
              <h2>Create Transport Auction</h2>
              <p>Add a new transport service auction to the marketplace</p>
            </div>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auction-form">
          <div className="form-sections">
            {/* Transport Information */}
            <div className="form-section">
              <h3>
                <Car size={20} />
                Transport Information
              </h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Service Name *</label>
                  <input
                    type="text"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    placeholder="e.g., Airport Transfer - Premium Car Service"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Location/Route *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Bangkok Airport → City Center"
                    required
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Transport Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Transport Type</option>
                    {transportTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Starting Price (ETH) *</label>
                  <input
                    type="number"
                    name="startingPrice"
                    value={formData.startingPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bidding Period Section */}
            <div className="form-section">
              <h3>
                <Timer size={20} />
                Bidding Period
              </h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Bid Start Date *</label>
                  <input
                    type="date"
                    name="bidStartDate"
                    value={formData.bidStartDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Bid Start Time *</label>
                  <input
                    type="time"
                    name="bidStartTime"
                    value={formData.bidStartTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Bid End Date *</label>
                  <input
                    type="date"
                    name="bidEndDate"
                    value={formData.bidEndDate}
                    onChange={handleInputChange}
                    min={formData.bidStartDate || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Bid End Time *</label>
                  <input
                    type="time"
                    name="bidEndTime"
                    value={formData.bidEndTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Bidding Summary */}
              {(formData.bidStartDate && formData.bidStartTime && formData.bidEndDate && formData.bidEndTime) && (
                <div className="bidding-summary">
                  <div className="summary-header">
                    <Clock size={16} />
                    <span>Bidding Summary</span>
                  </div>
                  
                  <div className="summary-details">
                    <div className="summary-row">
                      <span className="label">Start:</span>
                      <span className="value">
                        {new Date(`${formData.bidStartDate}T${formData.bidStartTime}`).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="summary-row">
                      <span className="label">End:</span>
                      <span className="value">
                        {new Date(`${formData.bidEndDate}T${formData.bidEndTime}`).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="summary-row">
                      <span className="label">Duration:</span>
                      <span className="value">{calculateBiddingDuration()}</span>
                    </div>
                    
                    <div className="summary-row">
                      <span className="label">Status:</span>
                      <span 
                        className="status-badge" 
                        style={{ color: biddingStatus.color, backgroundColor: `${biddingStatus.color}20` }}
                      >
                        {biddingStatus.text}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div className="form-section">
              <h3>
                <Upload size={20} />
                Transport Image
              </h3>
              
              <div className="image-upload-area">
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button 
                      type="button" 
                      className="remove-image"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="upload-label">
                    <Upload size={32} />
                    <span>Click to upload transport image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="form-section">
              <h3>Description</h3>
              <div className="form-group">
                <label>Service Details</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the transport service, vehicle details, pickup/dropoff instructions, included features, etc..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={isSubmitting}>
              <Save size={16} />
              {isSubmitting ? 'Creating...' : 'Create Auction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTransportAuction;