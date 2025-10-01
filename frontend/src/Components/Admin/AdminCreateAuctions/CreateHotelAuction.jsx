import React, { useState } from 'react';
import { 
  X, 
  Upload,  
  Clock, 
  Building2,
  Save,
  Timer,
} from 'lucide-react';
import './CreateHotelAuction.css';

const CreateHotelAuction = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    hotelName: '',
    location: '',
    city: '',
    checkInDate: '',
    checkOutDate: '',
    nights: '',
    roomType: '',
    guests: '',
    amenities: '',
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

    // Auto-calculate nights when dates change
    if (name === 'checkInDate' || name === 'checkOutDate') {
      const checkIn = name === 'checkInDate' ? value : formData.checkInDate;
      const checkOut = name === 'checkOutDate' ? value : formData.checkOutDate;
      
      if (checkIn && checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const timeDiff = checkOutDate - checkInDate;
        const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        if (nights > 0) {
          setFormData(prev => ({
            ...prev,
            nights: nights.toString()
          }));
        }
      }
    }
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

      // Validate check-in/check-out dates
      if (formData.checkInDate && formData.checkOutDate) {
        const checkInDate = new Date(formData.checkInDate);
        const checkOutDate = new Date(formData.checkOutDate);
        
        if (checkInDate >= checkOutDate) {
          alert('Check-out date must be after check-in date.');
          setIsSubmitting(false);
          return;
        }
      }

      // Create new auction object
      const newAuction = {
        id: Date.now(), // Simple ID generation
        title: formData.title,
        category: 'Hotels',
        location: `${formData.city}, ${formData.location}`,
        time: `${formData.checkInDate} → ${formData.checkOutDate}`,
        duration: formData.nights ? `${formData.nights} nights` : '—',
        price: `${formData.startingPrice} ETH`,
        startingPrice: formData.startingPrice,
        bids: 0,
        img: imagePreview || '/api/placeholder/300/200',
        description: formData.description,
        hotelName: formData.hotelName,
        city: formData.city,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        nights: formData.nights,
        roomType: formData.roomType,
        guests: formData.guests,
        amenities: formData.amenities,
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
              <h2>Create Hotel Auction</h2>
              <p>Add a new hotel auction to the marketplace</p>
            </div>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auction-form">
          <div className="form-sections">
            {/* Hotel Information */}
            <div className="form-section">
              <h3>
                <Building2 size={20} />
                Hotel Information
              </h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Auction Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Luxury Suite at Grand Hotel"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Hotel Name *</label>
                  <input
                    type="text"
                    name="hotelName"
                    value={formData.hotelName}
                    onChange={handleInputChange}
                    placeholder="e.g., Grand Hyatt Tokyo"
                    required
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Tokyo"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Location/Area *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Shibuya District"
                    required
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Check-in Date *</label>
                  <input
                    type="date"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Check-out Date *</label>
                  <input
                    type="date"
                    name="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleInputChange}
                    min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Number of Nights</label>
                  <input
                    type="number"
                    name="nights"
                    value={formData.nights}
                    onChange={handleInputChange}
                    placeholder="Auto-calculated"
                    min="1"
                    readOnly
                  />
                </div>
                
                <div className="form-group">
                  <label>Number of Guests *</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Room Type *</label>
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select room type</option>
                    <option value="Standard Room">Standard Room</option>
                    <option value="Deluxe Room">Deluxe Room</option>
                    <option value="Junior Suite">Junior Suite</option>
                    <option value="Executive Suite">Executive Suite</option>
                    <option value="Presidential Suite">Presidential Suite</option>
                    <option value="Penthouse">Penthouse</option>
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

              <div className="form-group">
                <label>Amenities</label>
                <input
                  type="text"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleInputChange}
                  placeholder="e.g., WiFi, Pool, Spa, Gym, Restaurant, Room Service"
                />
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
                Hotel Image
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
                    <span>Click to upload hotel image</span>
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
                <label>Hotel Details</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the hotel, room features, location highlights, special amenities, etc..."
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

export default CreateHotelAuction;