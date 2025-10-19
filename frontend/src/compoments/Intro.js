import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/BackGroundMain.jpg';

function Intro() {
  return (
    <section
      className="position-relative d-flex align-items-center"
      style={{
        minHeight: 'calc(100vh - 120px)',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ background: 'rgba(0,0,0,0.45)' }}
      />

      <div className="container position-relative">
        <div className="row">
          <div className="col-12 col-lg-7 text-white py-5">
            <h1 className="display-5 fw-bold mb-3" style={{ lineHeight: 1.2 }}>
              Smart Packaging & Delivery Management
            </h1>
            <p className="lead mb-4" style={{ opacity: 0.95 }}>
              Ruchi Packaging provides total packing solutions with innovative, high-quality
              products and reliable delivery. Manage customers, orders, and packages in one
              streamlined system.
            </p>
            <div className="d-flex gap-2 flex-wrap">
              <Link to="/Regi" className="btn btn-primary btn-lg px-4">
                Get Started
              </Link>
              <Link to="/CustomerLogin" className="btn btn-outline-light btn-lg px-4">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;