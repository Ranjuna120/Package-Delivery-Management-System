import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../style/Comman css/Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEmployee, setIsEmployee] = useState(false);

    useEffect(() => {
        // Function to update login and admin state
        const updateAuthState = () => {
            // Check if session has expired (24 hours)
            const lastLogin = localStorage.getItem('lastLogin');
            const sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
            
            if (lastLogin) {
                const timeElapsed = Date.now() - parseInt(lastLogin);
                if (timeElapsed > sessionTimeout) {
                    // Session expired, clear all auth data
                    clearAllAuthData();
                    setIsLoggedIn(false);
                    setIsAdmin(false);
                    setIsEmployee(false);
                    return;
                }
            }
            
            // Strictly check for 'true' string, any other value means not logged in
            const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
            const employeeLoggedIn = localStorage.getItem('employeeLoggedIn') === 'true';
            
            // If none are true, make sure all localStorage values are cleared
            if (!loggedIn && !adminLoggedIn && !employeeLoggedIn) {
                clearAllAuthData();
            }
            
            setIsLoggedIn(loggedIn);
            setIsAdmin(adminLoggedIn);
            setIsEmployee(employeeLoggedIn);
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

    const clearAllAuthData = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('employeeLoggedIn');
        localStorage.removeItem('lastLogin');
        localStorage.removeItem('username');
        localStorage.removeItem('customerName');
        localStorage.removeItem('customerId');
        localStorage.removeItem('empID');
        localStorage.removeItem('empName');
        localStorage.removeItem('empFullName');
        localStorage.removeItem('empPosition');
        localStorage.removeItem('empWage');
        localStorage.removeItem('employeeId');
    };

    const handleNavigate = (path) => {
        navigate(`${path}`);
    };

    const handleLogout = () => {
        clearAllAuthData();
        setIsLoggedIn(false);
        setIsAdmin(false);
        setIsEmployee(false);
        // Notify all listeners (including this tab) of admin login state change
        window.dispatchEvent(new Event('adminLoginChange'));
        navigate('/');
    };

    return (
        <div className="hed">
            <header>
                <h1 className="com_name">Ruchi Package</h1>
                {/* Search removed as requested */}
                <nav>
                    <ul className="nav_links">
                        {!isAdmin && !isEmployee && (
                          <li>
                            {isLoggedIn ? (
                              <a href="/CustomerProfileOne">Dashboard</a>
                            ) : (
                              <a href="/">Home</a>
                            )}
                          </li>
                        )}
                        {isEmployee && (
                          <li>
                            <a href="/EmployeeProfile">My Profile</a>
                          </li>
                        )}
                        {!isLoggedIn && !isAdmin && !isEmployee && <li><a href="/Regi">Register</a></li>}
                        {!isAdmin && !isEmployee && <li><a href="/AdminLogin">Admin</a></li>}
                        {!isAdmin && !isEmployee && !isLoggedIn && <li><a href="/EmpLogin">Employee</a></li>}
                    </ul>
                </nav>
                {isLoggedIn || isAdmin || isEmployee ? (
                    <button className="cta" onClick={handleLogout} style={{ background: '#dc3545' }}>Logout</button>
                ) : (
                    <button className="cta" onClick={() => handleNavigate('/CustomerLogin')}>Login</button>
                )}
            </header>
        </div>
    );
}

export default Header;
