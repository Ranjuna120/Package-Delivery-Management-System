import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../style/Comman css/Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);
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
        setIsLoggedIn(false);
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
                        <li><a href="/">Home</a></li>
                        {!isLoggedIn && <li><a href="/Regi">Register</a></li>}
                        <li><a href="/AdminLogin">Admin</a></li>
                        <li><a href="/EmpLogin">Employee</a></li>
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
