import React from "react";

const PersonalDataForm = () => {
  return(
    <div className="content">
      <h1 className="form-title">My Personal Data</h1>
      <div className="form-card">
        <h2 className="section-title">Personal Information</h2>
        <form className="personal-form">
          <div className="form-grid">
            <div className="form-group">
              <label>First Name :</label>
              <input type="text" defaultValue="Jay" />
            </div>
            <div className="form-group">
              <label>Last Name :</label>
              <input type="text" defaultValue="Gram" />
            </div>
            <div className="form-group">
              <label>Email address :</label>
              <input type="email" defaultValue="student1@gmail.com" />
            </div>
            <div className="form-group">
              <label>Phone :</label>
              <input type="tel" defaultValue="+0986-754-356" />
            </div>
            <div className="form-group">
              <label>Bio :</label>
              <input type="text" defaultValue="student" />
            </div>
            <div className="form-group">
              <label>Passport Number :</label>
              <input type="text" defaultValue="X54567455" />
            </div>
            <div className="form-group">
              <label>Country/Region :</label>
              <input type="text" defaultValue="Taiwan" />
            </div>
            <div className="form-group">
              <label>State/Province :</label>
              <input type="text" defaultValue="Taipei City" />
            </div>
            <div className="form-group">
              <label>City/Town :</label>
              <input type="text" defaultValue="Taipei City" />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn cancel">Cancel</button>
            <button type="submit" className="btn save">Save</button>
          </div>
        </form>
      </div> 
    </div>
  )
}

export default PersonalDataForm