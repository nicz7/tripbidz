import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Homepage/UserContext/Usercontext";

const PersonalDataForm = () => {
  const { user, setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    passportNumber: "",
    country: "",
    state: "",
    city: ""
  });
 const [isSaving, setIsSaving] = useState(false); // ⬅️ Optional: UI feedback

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:4000/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (res.ok && data.user) {
          setFormData({
            firstName: data.user.firstName || "",
            lastName: data.user.lastName || "",
            email: data.user.email || "",
            phoneNumber: data.user.phoneNumber || "",
            bio: data.user.bio || "",
            passportNumber: data.user.passportNumber || "",
            country: data.user.country || "",
            state: data.user.state || "",
            city: data.user.city || ""
          });

          if (!user) setUser(data.user); // update context if needed
        } else {
          console.error(data.error || "Failed to load user");
        }
      } catch (err) {
        console.error("Error loading user data:", err);
      }
    };

    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.bio || "",
        passportNumber: user.passportNumber || "",
        country: user.country || "",
        state: user.state || "",
        city: user.city || ""
      });
    } else {
      loadUserData(); // fallback fetch
    }
  }, [user, setUser]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true); // ⬅️ Start saving
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to update your profile.");
        setIsSaving(false);
        return;
      }
      const res = await fetch("http://localhost:4000/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Profile updated!");
        setUser(data.user || formData); // sync context
      } else {
        alert(data.error || "❌ Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("An error occurred while updating.");
    } finally {
      setIsSaving(false); // ⬅️ Done
    }
  };

  return (
    <div className="content">
      <h1 className="form-title">My Personal Data</h1>
      <div className="form-card">
        <h2 className="section-title">Personal Information</h2>
        <form className="personal-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name :</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Last Name :</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email address :</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} disabled />
            </div>
            <div className="form-group">
              <label>Phone :</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Bio :</label>
              <input type="text" name="bio" value={formData.bio} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Passport Number :</label>
              <input type="text" name="passportNumber" value={formData.passportNumber} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Country/Region :</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>State/Province :</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>City/Town :</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn cancel" onClick={() => window.location.reload()}>Cancel</button>
            <button type="submit" className="btn save" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDataForm;
