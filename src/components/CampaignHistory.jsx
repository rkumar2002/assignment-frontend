import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CampaignHistory() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Fetching campaigns data from the backend
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_API_LINK}/campaign`);
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="campaign-history-container">
      <h1 className="title">Campaign History</h1>
      {campaigns.length === 0 ? (
        <p className="no-campaigns">No campaigns held yet.</p>
      ) : (
        <div className="campaign-cards-container">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="campaign-card">
              <div className="card-header">
                <h3 className="campaign-name">{campaign.name}</h3>
                <span className="campaign-date">{new Date(campaign.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="card-body">
                <p><strong>Audience Segment:</strong> {campaign.audienceName}</p>
                <div className="card-stats">
                  <div>
                    <p><strong>Audience Size:</strong> {campaign.size}</p>
                  </div>
                  <div>
                    <p><strong>Messages Sent:</strong> {campaign.messagesSent}</p>
                  </div>
                  <div>
                    <p><strong>Messages Failed:</strong> {campaign.failed}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CampaignHistory;