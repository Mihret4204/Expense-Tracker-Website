import  '../styles/styles.css';
function Header(){
    return(
        <>
        <nav className="navbar">
        <div className="nav-brand">
            <i className="fas fa-wallet"></i>
            <span>BirrFlow</span>
        </div>
        <div className="nav-links">
            <a href="#">Dashboard</a>
            <a href="#">Add</a>
            <a href="#" class="active">History</a>
            <a href="#">About us</a>
            <a href="#">Login</a>
        </div>
        </nav>
        </>
    )
};
export default Header;
