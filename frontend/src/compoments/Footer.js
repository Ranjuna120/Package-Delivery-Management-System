import React from 'react';
import './../style/Comman css/footer.css';
// import fb from '..';
// import twitter from '..';
// import linkedin from '..';
// import Instagram from '..';

function Footer() {
    return (
        <div className='footer'>
            <div className='sb_footer section_padding'>
                <div className='sb_footer-links'>
                    <div className='sb_footer-links-div'>
                        <h4>For Business</h4>
                        <a href='/employee'>
                            <p>Employee</p>
                        </a>
                        <a href='/packages'>
                            <p>Packages</p>
                        </a>
                        <a href='/orders'>
                            <p>Orders</p>
                        </a>
                    </div>
                    <div className='sb_footer-links-div'>
                        <h4>Resources</h4>
                        <a href='/resources'>
                            <p>Resources</p>
                        </a>
                        <a href='/packages'>
                            <p>Packages</p>
                        </a>
                        <a href='/orders'>
                            <p>Orders</p>
                        </a>
                    </div>
                    <div className='sb_footer-links-div'>
                        <h4>Partners</h4>
                        <a href='/partners'>
                            <p>Maliban</p>
                        </a>
                        <a href='/packages'>
                            <p>Jone Keells</p>
                        </a>
                        <a href='/orders'>
                            <p>Unilever</p>
                        </a>
                    </div>
                    <div className='sb_footer-links-div'>
                        <h4>Company</h4>
                        <a href='/about'>
                            <p>About</p>
                        </a>
                        <a href='/press'>
                            <p>History</p>
                        </a>
                        <a href='/career'>
                            <p>Career</p>
                        </a>
                        <a href='/contact'>
                            <p>Contact</p>
                        </a>
                    </div>
                    <div className='sb_footer-links-div'>
                        <h4>Social Contact</h4>
                        <div className='socialmedia'>
                            <p><i class="fab fa-facebook-f fa-2x" style={{ color: '#3b5998' }}></i></p>
                            <p><i class="fab fa-twitter fa-2x" style= {{color: '#55acee'}}></i></p>
                            <p><i class="fab fa-linkedin-in fa-2x" style={{color: '#0082ca'}}></i></p>
                            <p><i class="fab fa-instagram fa-2x" style={{color: '#ac2bac'}}></i></p>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className='sb_footer-below'>
                    <div className='sb_footer-copyright'>
                        <p>
                            @{new Date().getFullYear()} TeamPisso. All right reserver.
                        </p>
                    </div>
                    <div className='sb_footer-below-links'>
                        <a href="/terms"><div className=''><p>Terms & Conditions</p></div></a>
                        <a href="/terms"><div className=''><p>Privacy</p></div></a>
                        <a href="/terms"><div className=''><p>Security</p></div></a>
                        <a href="/terms"><div className=''><p>Cooke Declaration</p></div></a>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;

