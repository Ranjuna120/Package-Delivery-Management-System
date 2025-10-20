import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../style/Comman css/Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Function to update login and admin state
        const updateAuthState = () => {
            const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
            setIsLoggedIn(loggedIn);
            const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
            setIsAdmin(adminLoggedIn);
        };
        updateAuthState();
        // Listen for storage changes (multi-tab and immediate update)
        window.addEventListener('storage', updateAuthState);
        // Listen for custom event for same-tab updates
        window.addEventListener('adminLoginChange', updateAuthState);
        return () => {
            window.removeEventListener('storage', updateAuthState);
            window.removeEventListener('adminLoginChange', updateAuthState);
        };
    }, []);

    const handleNavigate = (path) => {
        navigate(`${path}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('customerName');
        localStorage.removeItem('customerId');
        localStorage.removeItem('lastLogin');
        localStorage.removeItem('adminLoggedIn');
        setIsLoggedIn(false);
        setIsAdmin(false);
        // Notify all listeners (including this tab) of admin login state change
        window.dispatchEvent(new Event('adminLoginChange'));
        navigate('/');
    };

    return (
        <div className="hed">
            <header>
                <h1 className="com_name">Ruchi Package</h1>
                <form className="search-form" action="">
                    <input className="in" type="search" placeholder="Search here ..." />
                    <i className="fa fa-search"></i>
                </form>
                <nav>
                    <ul className="nav_links">
                        {!isAdmin && (
                          <li>
                            {isLoggedIn ? (
                              <a href="/CustomerProfileOne">Dashboard</a>
                            ) : (
                              <a href="/">Home</a>
                            )}
                          </li>
                        )}
                        {!isLoggedIn && !isAdmin && <li><a href="/Regi">Register</a></li>}
                        {!isAdmin && <li><a href="/AdminLogin">Admin</a></li>}
                        {!isAdmin && <li><a href="/EmpLogin">Employee</a></li>}
                    </ul>
                </nav>
                {!isLoggedIn ? (
                    <button className="cta" onClick={() => handleNavigate('/CustomerLogin')}>Login</button>
                ) : (
                    <button className="cta" onClick={handleLogout} style={{ background: '#dc3545' }}>Logout</button>
                )}
            </header>
        </div>
    );
}

export default Header;
