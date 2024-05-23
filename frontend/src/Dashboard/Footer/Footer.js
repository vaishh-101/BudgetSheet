import React from 'react';
import './Footer.css';
import { FaGithub, FaEnvelope, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-text'>
        Developed By Vaishnavi Choudhary
      </div>
      <div className='footer-icons'>
        <a href='https://github.com/vaishh-101' target="_blank" rel="noopener noreferrer">
          <FaGithub className='footer-icon' />
        </a>
        <a href='mailto:vaishnavichoudhary200@gmail.com' target="_blank" rel="noopener noreferrer">
          <FaEnvelope className='footer-icon' />
        </a>
        <a href='https://www.linkedin.com/in/vaishnavi-choudhary-845a4a1b7/' target="_blank" rel="noopener noreferrer">
          <FaLinkedin className='footer-icon' />
        </a>
      </div>
    </div>
  );
}

export default Footer;
