import React, { useState } from 'react';
import '../styles/registration.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    nickname: '',
    email: '',
    whatsapp_number: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formPayload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      nickname: formData.nickname,
      email: formData.email,
      whatsapp_number: formData.whatsapp_number
    };

    const API_URL = 'https://oppirifchess-backend.onrender.com';
  
    try {
      const response = await fetch(`${API_URL}/api/member`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formPayload),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Form Submitted:', data);
        alert('You have successfully registered for the Oppirif Chess Club!');
        
        setFormData({
          first_name: '',
          last_name: '',
          nickname: '',
          email: '',
          whatsapp_number: ''
        });

        //navigate to the homepage
        navigate('/');
        
      } else {
        throw new Error('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your registration, please try again later.');
    }
  };

  return (
    <div>
      <main>
        <div className="contact-info">
          <div className="line">
            Become a member of the Oppirif Chess Club
          </div>
        </div>
        <div className="user-input">
          <form onSubmit={handleSubmit}>
            <div className="left">
              <input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="First name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Last name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="nickname"
                id="nickname"
                placeholder="Nickname (What everyone calls you)"
                value={formData.nickname}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="whatsapp_number"
                id="whatsapp_number"
                placeholder="WhatsApp Number"
                value={formData.whatsapp_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="right">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Registration;
