import Home from '../pages/Home.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
function Layout() {
    return (
        <>
        <Header/>
        <main>
            <Home />
        </main>
        <Footer/>
        </>
        
    );
}
export default Layout;