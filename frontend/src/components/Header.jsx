function Header(){
    return(
        <>
        <nav class="navbar">
        <div class="nav-brand">
            <i class="fas fa-wallet"></i>
            <span>BirrFlow</span>
        </div>
        <div class="nav-links">
            <a href="dashboard.js">Dashboard</a>
            <a href="add-transaction.js">Add</a>
            <a href="history.js" class="active">History</a>
            <a href="about-us.js">About us</a>
            <a href="index.js">Login</a>
        </div>
        </nav>
        </>
    )
};
export default Header;
