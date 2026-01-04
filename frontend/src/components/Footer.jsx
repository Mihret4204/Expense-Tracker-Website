import '../styles/styles.css';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer className="footer">
        <div className="footer-content">
            <div className="footer-section">
                <h3>BirrFlow</h3>
                <p>Your trusted expense tracking companion for managing finances in Ethiopia and beyond.</p>
                <div className="social-links">
                    <Link to="/"><i className="fab fa-facebook"></i></Link>
                    <Link to="/"><i className="fab fa-twitter"></i></Link>
                    <Link to="/"><i className="fab fa-linkedin"></i></Link>
                    <Link to="/"><i className="fab fa-instagram"></i></Link>
                </div>
            </div>
            
            <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>                     
                    <li><Link to="/dashBoard">Dashboard</Link></li>
                    <li><Link to="/add-transaction">Add Transaction</Link></li>
                    <li><Link to="/history">Transaction History</Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                </ul>
            </div>
            
            <div className="footer-section">
                <h4>Contact Info</h4>
                <ul>
                    <li><i className="fas fa-envelope"></i> info@birrflow.com</li>
                    <li><i className="fas fa-phone"></i> +251 900 000 000</li>
                    <li><i className="fas fa-map-marker-alt"></i> 5kilo, Addis Ababa, Ethiopia</li>
                </ul>
            </div>
            
            <div className="footer-section">
                <h4>Resources</h4>
                <ul>
                    <li><Link to="/">Privacy Policy</Link></li>
                    <li><Link to="/">Terms of Service</Link></li>
                    <li><Link to="/">Help Center</Link></li>
                    <li><Link to="/">FAQ</Link></li>
                </ul>
            </div>
        </div>
        
        <div className="footer-bottom">
            <p>&copy; 2025 BirrFlow. All rights reserved. Made in Ethiopia.</p>
        </div>
    </footer>

  );
};
export default Footer;