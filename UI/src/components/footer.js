import React from 'react';
// Import Link from react-router-dom for internal navigation
// Ensure you have your CSS file linked
import { Link } from 'react-router-dom'; 

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer-container">
                {/* Left section for navigation content */}
                <div className="footer-section">
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/journals">Journals</a></li>
                            <li><a href="/details">Details</a></li>
                        </ul>
                    </nav>
                </div>

                {/* Center section for links */}
                <div className="footer-section secondSection">
                    <ul className="footer-links">
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Community Policy</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div className="footer-section thirdSection">
                    <span>Follow us</span>
                    <ul className="social-icons">
                        <li>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <img src={require('../images/facebook.webp')} alt="Facebook" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                                <img src={require('../images/youtube.webp')} alt="Youtube" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                <img src={require('../images/instagram.webp')} alt="Instagram" />
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                <img src={require('../images/twitter.webp')} alt="Twitter" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="copywrightContainer">
                {/* Copyright Section */}
                <p>&copy; 2024 Urban Furniture</p>
            </div>
        </footer>
    );
};

export default Footer;
