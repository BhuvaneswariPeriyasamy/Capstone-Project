// ui/src/components/Footer.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Footer = () => {
    const [socialIcons, setSocialIcons] = useState({});

    useEffect(() => {
        const fetchIcons = async () => {
            try {
                const icons = ['facebook', 'youtube', 'instagram', 'x'];
                const fetchedIcons = {};

                // Fetch each icon by filename
                for (const icon of icons) {
                    const response = await axios.get(`http://localhost:5000/banner/${icon}`, {
                        responseType: 'blob'
                    });
                    const url = URL.createObjectURL(response.data);
                    fetchedIcons[icon] = url;
                }
                setSocialIcons(fetchedIcons);
            } catch (error) {
                console.error('Error loading social media icons:', error);
            }
        };

        fetchIcons();
    }, []);

    return (
        <footer className='footer'>
            <div className="footer-container">
                {/* Navigation Section */}
                <div className="footer-section">
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/login">Login</a></li>
                            <li><a href="/register">Register</a></li>
                            <li><a href="/cart">Cart</a></li>
                            <li><a href="/products">Products</a></li>
                        </ul>
                    </nav>
                </div>

                {/* Links Section */}
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
                                <img src={socialIcons.facebook} alt="Facebook" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                                <img src={socialIcons.youtube} alt="YouTube" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                <img src={socialIcons.instagram} alt="Instagram" />
                            </a>
                        </li>
                        <li>
                            <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                                <img src={socialIcons.x} alt="X" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="copywrightContainer">
                <p>&copy; 2024 Urban Furniture</p>
            </div>
        </footer>
    );
};

export default Footer;
