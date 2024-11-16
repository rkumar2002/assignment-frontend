import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCampaign = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, size, customers } = location.state || {};  // Extract passed data

  const [campaignName, setCampaignName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the data to send to backend
    const campaignData = {
      campaignName,
      message,
      audienceId: id,
      customers,
      size
    };

    try {
      // Send the data to the backend to create the campaign and send messages
      const response = await axios.post(`${process.env.REACT_APP_BASE_API_LINK}/campaign`, campaignData);
      console.log(response);

      // Display success toast
      toast.success('Campaign Created!', {
        position: "top-right",
        autoClose: 3000,  
    });

      setTimeout(() => {
        navigate('/audience-segments');
      }, 2000); 

    } catch (error) {
      console.error('Error creating campaign:', error);

      // Display error toast
      toast.error('Campaign could not be created!', {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="campaign-creation-container">
      <ToastContainer/>
      <h1 className="create-campaign-title">Create a Campaign for <i style={{ color: "blue" }}>{name}</i></h1>

      <form className="campaign-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="campaignName">Campaign Name:</label>
          <input 
            type="text" 
            id="campaignName" 
            name="campaignName" 
            className="input-field" 
            placeholder="Enter the campaign name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea 
            id="message" 
            name="message" 
            className="textarea-field"
            placeholder="Hi [Name], here’s 10% off on your next order!" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required 
          />
          <p className="note">Note: Use "[Name]" to dynamically insert the customer’s name.</p>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Creating Campaign...' : 'Create Campaign'}
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;