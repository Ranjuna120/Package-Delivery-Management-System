import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = () => {
    // Inline styles for the breadcrumb component
    const breadcrumbStyle = {
        display: 'flex',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        justifyContent: 'center',
    };

    const breadcrumbItemStyle = {
        float: 'right',
        padding: '5px',
        borderRadius: '50px',
        position: 'relative',
        marginLeft: '-50px',
        marginTop: '3px',
        background: '#fff5e6',
        transition: 'all 0.2s ease-in-out',
    };

    const breadcrumbLinkStyle = {
        overflow: 'hidden',
        borderRadius: '50px',
        transition: 'all 0.2s ease-in-out',
        textDecoration: 'none',
        width: '80px',
        height: '50px',
        color: 'red',
        background: '#ffd699',
        textAlign: 'center',
        display: 'block',
        lineHeight: '50px',
        paddingLeft: '52px',
        paddingRight: '33.33px',
    };

    const iconStyle = {
        display: 'inline-block',
    };

    const textStyle = {
        display: 'none',
        opacity: 0,
    };

    return (
        <ul style={breadcrumbStyle}>
            {/* Link to Home */}
            <li style={breadcrumbItemStyle}>
                <Link 
                    to="/" 
                    style={breadcrumbLinkStyle}
                    onMouseOver={(e) => {
                        e.currentTarget.style.width = '150px';
                        e.currentTarget.style.background = '#ffccff';
                        e.currentTarget.querySelector('.text').style.display = 'inline-block';
                        e.currentTarget.querySelector('.text').style.opacity = '1';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.width = '80px';
                        e.currentTarget.style.background = '#ffd699';
                        e.currentTarget.querySelector('.text').style.display = 'none';
                        e.currentTarget.querySelector('.text').style.opacity = '0';
                    }}
                >
                    <span className="icon icon-home" style={iconStyle}></span>
                    <span className="text" style={textStyle}>Home</span>
                </Link>
            </li>

            {/* Link to Create Package */}
            <li style={breadcrumbItemStyle}>
                <Link 
                    to="/create" 
                    style={breadcrumbLinkStyle}
                    onMouseOver={(e) => {
                        e.currentTarget.style.width = '150px';
                        e.currentTarget.style.background = '#ffccff';
                        e.currentTarget.querySelector('.text').style.display = 'inline-block';
                        e.currentTarget.querySelector('.text').style.opacity = '1';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.width = '80px';
                        e.currentTarget.style.background = '#ffd699';
                        e.currentTarget.querySelector('.text').style.display = 'none';
                        e.currentTarget.querySelector('.text').style.opacity = '0';
                    }}
                >
                    <span className="icon icon-create" style={iconStyle}></span>
                    <span className="text" style={textStyle}>Create</span>
                </Link>
            </li>

            {/* Link to View Packages */}
            <li style={breadcrumbItemStyle}>
                <Link 
                    to="/packages" 
                    style={breadcrumbLinkStyle}
                    onMouseOver={(e) => {
                        e.currentTarget.style.width = '150px';
                        e.currentTarget.style.background = '#ffccff';
                        e.currentTarget.querySelector('.text').style.display = 'inline-block';
                        e.currentTarget.querySelector('.text').style.opacity = '1';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.width = '80px';
                        e.currentTarget.style.background = '#ffd699';
                        e.currentTarget.querySelector('.text').style.display = 'none';
                        e.currentTarget.querySelector('.text').style.opacity = '0';
                    }}
                >
                    <span className="icon icon-view" style={iconStyle}></span>
                    <span className="text" style={textStyle}>View</span>
                </Link>
            </li>
            {/* Link to Generate Reports */}
            <li style={breadcrumbItemStyle}>
                <Link 
                    to="/reportGen" 
                    style={breadcrumbLinkStyle}
                    onMouseOver={(e) => {
                        e.currentTarget.style.width = '150px';
                        e.currentTarget.style.background = '#ffccff';
                        e.currentTarget.querySelector('.text').style.display = 'inline-block';
                        e.currentTarget.querySelector('.text').style.opacity = '1';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.width = '80px';
                        e.currentTarget.style.background = '#ffd699';
                        e.currentTarget.querySelector('.text').style.display = 'none';
                        e.currentTarget.querySelector('.text').style.opacity = '0';
                    }}
                >
                    <span className="icon icon-report" style={iconStyle}></span>
                    <span className="text" style={textStyle}>Report</span>
                </Link>
            </li>

            {/* Link to Search */}
            <li style={breadcrumbItemStyle}>
                <Link 
                    to="/search" 
                    style={breadcrumbLinkStyle}
                    onMouseOver={(e) => {
                        e.currentTarget.style.width = '150px';
                        e.currentTarget.style.background = '#ffccff';
                        e.currentTarget.querySelector('.text').style.display = 'inline-block';
                        e.currentTarget.querySelector('.text').style.opacity = '1';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.width = '80px';
                        e.currentTarget.style.background = '#ffd699';
                        e.currentTarget.querySelector('.text').style.display = 'none';
                        e.currentTarget.querySelector('.text').style.opacity = '0';
                    }}
                >
                    <span className="icon icon-search" style={iconStyle}></span>
                    <span className="text" style={textStyle}>Search</span>
                </Link>
            </li>

            
        </ul>
    );
};

export default Breadcrumb;