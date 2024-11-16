import React from 'react';
import { Link , useNavigate} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('googleAuthToken'); 
    localStorage.removeItem('user');
    navigate('/');  
    window.location.reload();  
  };
  
  return (
    <nav className="navbar">
      <ul className="nav">
        <li><Link to="/audience-segments">Audience Segments</Link></li>
        <li><Link to="/campaign-history">Campaign History</Link></li>
        <li><Link to="/communication-logs">Message Logs</Link></li>
        {localStorage.getItem('googleAuthToken') && (
          <li className="sign-out">
            <button onClick={handleLogout}>Sign Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
  
};

export default Navbar;
