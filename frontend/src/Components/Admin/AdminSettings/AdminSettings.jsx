import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Save,
  Eye,
  EyeOff,
  Check
} from 'lucide-react';
import './AdminSettings.css';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [saveStatus, setSaveStatus] = useState('');

  // Form states
  const [profileData, setProfileData] = useState({
    username: 'nicz7',
    email: 'nicz7@tripbidz.com',
    fullName: 'Nicolas Admin',
    role: 'Administrator'
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    auctionAlerts: true,
    bidAlerts: true,
    weeklyReports: false
  });

  const [systemSettings, setSystemSettings] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    currency: 'ETH'
  });

  const handleSave = (section) => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 1000);
  };

  const settingsTabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'system', name: 'System', icon: Database }
  ];

  const renderProfileSettings = () => (
    <div className="settings-section">
      <div className="settings-header">
        <h3>Profile Information</h3>
        <p>Update your account profile and personal information</p>
      </div>
      <div className="settings-form">
        {/* Personal Information */}
        <div className="form-section">
          <h4>Personal Information</h4>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                className="form-input"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                className="form-input"
                placeholder="Enter full name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="form-input"
                placeholder="Enter email address"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <select 
                value={profileData.role}
                onChange={(e) => setProfileData({...profileData, role: e.target.value})}
                className="form-select"
              >
                <option value="Administrator">Administrator</option>
                <option value="Manager">Manager</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            onClick={() => handleSave('profile')} 
            className="save-btn"
            disabled={saveStatus === 'saving'}
          >
            <Save size={16} />
            {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="settings-section">
      <div className="settings-header">
        <h3>Security Settings</h3>
        <p>Manage your password and security preferences</p>
      </div>
      <div className="settings-form">
        {/* Change Password Section */}
        <div className="form-section">
          <h4>Change Password</h4>
          <div className="password-section">
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <div className="password-input">
                <input
                  type={showPassword.current ? "text" : "password"}
                  value={securityData.currentPassword}
                  onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                  className="form-input"
                  placeholder="Enter current password"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(prev => ({...prev, current: !prev.current}))}
                  className="password-toggle"
                >
                  {showPassword.current ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="password-row">
              <div className="form-group">
                <label className="form-label">New Password</label>
                <div className="password-input">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    value={securityData.newPassword}
                    onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                    className="form-input"
                    placeholder="Enter new password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(prev => ({...prev, new: !prev.new}))}
                    className="password-toggle"
                  >
                    {showPassword.new ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="password-input">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    value={securityData.confirmPassword}
                    onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                    className="form-input"
                    placeholder="Confirm new password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(prev => ({...prev, confirm: !prev.confirm}))}
                    className="password-toggle"
                  >
                    {showPassword.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="form-section">
          <h4>Two-Factor Authentication</h4>
          <div className="toggle-section">
            <div className="toggle-setting">
              <div className="toggle-info">
                <h5>Enable 2FA</h5>
                <p>Add an extra layer of security to your account</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={securityData.twoFactorEnabled}
                  onChange={(e) => setSecurityData({...securityData, twoFactorEnabled: e.target.checked})}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            onClick={() => handleSave('security')} 
            className="save-btn"
          >
            <Shield size={16} />
            Update Security
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-section">
      <div className="settings-header">
        <h3>Notification Preferences</h3>
        <p>Choose how you want to be notified about auction activities</p>
      </div>
      <div className="settings-form">
        <div className="form-section">
          <h4>Notification Settings</h4>
          <div className="toggle-section">
            {Object.entries(notificationSettings).map(([key, value]) => (
              <div key={key} className="toggle-setting">
                <div className="toggle-info">
                  <h5>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h5>
                  <p>Get notified about {key.toLowerCase().replace(/([A-Z])/g, ' $1')}</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      [key]: e.target.checked
                    })}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button 
            onClick={() => handleSave('notifications')} 
            className="save-btn"
          >
            <Bell size={16} />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="settings-section">
      <div className="settings-header">
        <h3>System Preferences</h3>
        <p>Configure application settings and preferences</p>
      </div>
      <div className="settings-form">
        <div className="form-section">
          <h4>Application Settings</h4>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Theme</label>
              <select 
                value={systemSettings.theme}
                onChange={(e) => setSystemSettings({...systemSettings, theme: e.target.value})}
                className="form-select"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Language</label>
              <select 
                value={systemSettings.language}
                onChange={(e) => setSystemSettings({...systemSettings, language: e.target.value})}
                className="form-select"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Timezone</label>
              <select 
                value={systemSettings.timezone}
                onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
                className="form-select"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="CET">Central European Time</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Default Currency</label>
              <select 
                value={systemSettings.currency}
                onChange={(e) => setSystemSettings({...systemSettings, currency: e.target.value})}
                className="form-select"
              >
                <option value="ETH">Ethereum (ETH)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="BTC">Bitcoin (BTC)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            onClick={() => handleSave('system')} 
            className="save-btn"
          >
            <Database size={16} />
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'system':
        return renderSystemSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className="settings-page">
      <header className="admin-header">
        <div className="header-title">
          <h1>Settings</h1>
          <p>Manage your account and application preferences</p>
        </div>
        {saveStatus === 'saved' && (
          <div className="save-indicator">
            <Check size={16} />
            <span>Saved successfully</span>
          </div>
        )}
      </header>

      <div className="settings-container">
        <nav className="settings-nav">
          {settingsTabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={20} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="settings-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;