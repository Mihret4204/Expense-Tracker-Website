import  '../styles/styles.css';
import { Link } from 'react-router-dom';
function Header(){
    return(
        <>
        <nav className="navbar">
        <div className="nav-brand">
            <i className="fas fa-wallet"></i>
            <span>BirrFlow</span>
        </div>
        <div className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/">Add</Link>
            <Link to="/">History</Link>
            <Link to="/">About us</Link>
            <Link to="/">Login</Link>
        </div>
        </nav>
        </>
    )
};
export default Header;
