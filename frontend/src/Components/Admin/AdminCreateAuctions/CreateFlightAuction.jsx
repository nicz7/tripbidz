import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Calendar, 
  Clock, 
  MapPin, 
  Plane,
  Save,
  ArrowLeft,
  Timer,
  DollarSign
} from 'lucide-react';
import './CreateFlightAuction.css';

const CreateFlightAuction = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    airline: '',
    departure: '',
    arrival: '',
    departureDate: '',
    departureTime: '',
    arrivalTime: '',
    duration: '',
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

      const startDateTime = new Date(`${formData.bidStartDate}T${formData.bidStartTime}`);
      const endDateTime = new Date(`${formData.bidEndDate}T${formData.bidEndTime}`);
      
      if (startDateTime >= endDateTime) {
        alert('Bid end time must be after bid start time.');
        setIsSubmitting(false);
        return;
      }

      // Create new auction object
      const newAuction = {
        id: Date.now(), // Simple ID generation
        title: formData.title,
        category: 'Flights',
        location: `${formData.departure} → ${formData.arrival}`,
        time: `${formData.departure} → ${formData.arrival}`,
        duration: formData.duration || '—',
        price: `${formData.startingPrice} ETH`,
        startingPrice: formData.startingPrice,
        bids: 0,
        img: imagePreview || '/api/placeholder/300/200',
        description: formData.description,
        airline: formData.airline,
        departureDate: formData.departureDate,
        departureTime: formData.departureTime,
        arrivalTime: formData.arrivalTime,
        status: 'active',
        createdAt: new Date().toISOString(),
        // Bidding timing
        bidStartDate: formData.bidStartDate,
        bidStartTime: formData.bidStartTime,
        bidEndDate: formData.bidEndDate,
        bidEndTime: formData.bidEndTime,
        bidStartDateTime: startDateTime.toISOString(),
        bidEndDateTime: endDateTime.toISOString(),
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
              <h2>Create Flight Auction</h2>
              <p>Add a new flight auction to the marketplace</p>
            </div>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auction-form">
          <div className="form-sections">
            {/* Flight Information */}
            <div className="form-section">
              <h3>
                <Plane size={20} />
                Flight Information
              </h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Flight Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Premium Economy to Tokyo"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Airline *</label>
                  <input
                    type="text"
                    name="airline"
                    value={formData.airline}
                    onChange={handleInputChange}
                    placeholder="e.g., Japan Airlines"
                    required
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Departure City *</label>
                  <input
                    type="text"
                    name="departure"
                    value={formData.departure}
                    onChange={handleInputChange}
                    placeholder="e.g., Taipei"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Arrival City *</label>
                  <input
                    type="text"
                    name="arrival"
                    value={formData.arrival}
                    onChange={handleInputChange}
                    placeholder="e.g., Tokyo"
                    required
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Departure Date *</label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 3h 45m"
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Departure Time</label>
                  <input
                    type="time"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Arrival Time</label>
                  <input
                    type="time"
                    name="arrivalTime"
                    value={formData.arrivalTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-grid">
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
                Flight Image
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
                    <span>Click to upload flight image</span>
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
                <label>Flight Details</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the flight details, amenities, seat class, etc..."
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

export default CreateFlightAuction;