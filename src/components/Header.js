import React from 'react';
import { useAuth } from './authContext';
import { useNavigate } from 'react-router';

const Header = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        logout();
    };
    
    return(
        <div className="top-header">
            <button className="logout-btn"  onClick={handleSubmit}>
                Logout
            </button>
        </div>
    )
}

export default Header;