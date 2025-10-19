import React from 'react';
import backgroundImage from '../images/BackGroundMain.jpg';


function Intro() {
    return (
        <div>
        <div>
          <style>
            {`
            .intro-image {
                background-size: cover;
                background-position: center;
                width: 99vw;
             }
            .intro-text{
                display: flex;
                position: absolute;
                top: 18%;
                left: 1%;
                right: 80%;
                padding-left: 3px;
                color: white;
                background: rgba(0, 0, 0, 0.5);
            }
            }
          `}
            
          </style>
        </div>
      <div className="intro">
        <img src={backgroundImage} alt="BackGroundMain" className="intro-image" />
        <p className="intro-text">Ruchi Packaging was started by Mr. Indika Ruwan Wijekoon in 2010. Ruchi Packaging is an indirect Exporter and member of National Chamber of Exporters in Sri Lanka,. Located in No. 403/A, Makola South, Makola. Ruchi Packaging provides total packing solutions to the customers and strives to offer its customers the most innovative solutions customized and manufactured to the highest quality to ensure customer satisfaction. We have years of experience working with industry leaders in many more industries.</p>
      </div>
      </div>
    );
  }
export default Intro;