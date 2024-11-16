import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const AudienceSegments = () => {
  const [audiences, setAudiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    // Fetch the audience segments from the backend
    axios.get(`${process.env.REACT_APP_BASE_API_LINK}/audience`)
      .then(response => {
        setAudiences(response.data);  // Store the audience data in state
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching audience segments:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="audience-segments-container">
      <button 
        className="create-audience-btn"
        onClick={() => window.location.href = '/create-audience-segment'}>
        Create Audience Segment
      </button>

      <h1 className="audience-segments-title">Audience Segments</h1>
      {audiences.length === 0 ? (
        <p className="no-segment-message">No segment created yet.</p>
      ) : (
        <div className="audience-list">
          {audiences.map((audience, index) => (
            <div key={audience.id} className="audience-box">
              <h3 className="audience-name">{audience.name}</h3>
              <p className="audience-conditions"><strong>Conditions:</strong> {audience.conditions}</p>
              <p className="audience-size"><strong>Size:</strong> {audience.size}</p>
              <button 
                className="initiate-campaign-btn" 
                onClick={() => navigate('/create-campaign', {
                  state: {
                    id: audience.id,
                    name: audience.name,
                    size: audience.size,
                    customers: audience.customers
                  }
                })}>
                Initiate Campaign
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AudienceSegments;
