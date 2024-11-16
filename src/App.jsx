import './App.css';
import axios from 'axios';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AudienceSegments from './components/AudienceSegments';
import CampaignHistory from './components/CampaignHistory';
import CreateAudience from './components/CreateAudience'; 
import CreateCampaign from './components/CreateCampaign';
import MessageLogs from './components/MessageLogs';
import ProtectedRoute from './components/ProtectedRoute';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function App() {

  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
  
    // Save the token in localStorage
    localStorage.setItem('googleAuthToken', response.credential);
  
    // Optionally, send the token to the backend to retrieve more user details
    axios.post(`${process.env.REACT_APP_BASE_API_LINK}/auth/google`, { token: response.credential })
      .then(res => {
        console.log('Backend response:', res.data);
        // You can store additional user data if needed (like user info)
        localStorage.setItem('user', JSON.stringify(res.data.user));
        window.location.reload(); 
      })
      .catch(err => {
        console.error('Error logging in with Google:', err);
      });
  };
  

  const handleLoginFailure = (error) => {
    console.log('Login Failed:', error);
    alert("Login Failed! Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        {/* If user is authenticated, show the main app */}
        {localStorage.getItem('googleAuthToken') ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/audience-segments" />} />
              <Route path="/audience-segments" element={<ProtectedRoute element={<AudienceSegments />} />} />
              <Route path="/campaign-history" element={<ProtectedRoute element={<CampaignHistory />} />} />
              <Route path="/create-audience-segment" element={<ProtectedRoute element={<CreateAudience />} />} />
              <Route path="/create-campaign" element={<ProtectedRoute element={<CreateCampaign />} />} />
              <Route path="/communication-logs" element={<ProtectedRoute element={<MessageLogs />} />} />
            </Routes>
          </>
        ) : (
          <div className="login-container">
            <h2>Please sign in with Google to access the site</h2>
            <div className="google-login-logo">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
              />
            </div>
          </div>
        )}
      </Router>
    </GoogleOAuthProvider>
  );
  
}

export default App;