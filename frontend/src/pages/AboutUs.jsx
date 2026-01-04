function AboutUs(){
    return(
        <>
        <main className="about-container">
        <section className="hero-section">
            <div className="hero-content">
                <h1>About BirrFlow</h1>
                <p>Your trusted companion for financial management in Ethiopia and beyond</p>
               <br/>
                <div className="hero-image">
                    <img src="https://images.unsplash.com/photo-1711606815631-38d32cdaec3e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D " alt="finacial management"/>
                </div>
            </div>
        </section>

        <section className="mission-section">
            <div className="section-content">
                <h2>Our Mission</h2>
                <div className="text-content">
                    
                    <br/>
                    <p>BirrFlow is dedicated to empowering individuals and businesses in Ethiopia with simple, intuitive financial tracking tools. We believe that managing your money should be straightforward, accessible, and tailored to your local context.</p>
                    <p>Founded in 2025, we recognized the need for a financial management solution that understands the unique challenges and opportunities of the Ethiopian market while maintaining global standards of excellence.</p>
                </div>
               
            </div>
        </section>

        <section className="features-section">
            <br/>
            <h2>Why Choose BirrFlow?</h2>
            <div className="features-grid">
                <div className="feature-card">
                    <i className="fas fa-chart-line"></i>
                    <h3>Real-time Analytics</h3>
                    <p>Get instant insights into your spending patterns and financial health with our advanced analytics dashboard.</p>
                </div>
                <div className="feature-card">
                    <i className="fas fa-shield-alt"></i>
                    <h3>Secure & Private</h3>
                    <p>Your financial data is encrypted and protected with bank-level security measures.</p>
                </div>
                <div className="feature-card">
                    <i className="fas fa-mobile-alt"></i>
                    <h3>Mobile First</h3>
                    <p>Access your finances anywhere, anytime with our responsive design that works perfectly on all devices.</p>
                </div>
                <div className="feature-card">
                    <i className="fas fa-coins"></i>
                    <h3>ETB Optimized</h3>
                    <p>Built with Ethiopian Birr in mind, supporting local financial practices and currencies.</p>
                </div>
            </div>
        </section>
        <section className="contact-section">
            <h2>Get in Touch</h2>
            <br/>
            <div className="contact-content">
                <div className="contact-info">
                    <div className="contact-item">
                        <i className="fas fa-envelope"></i>
                        <div>
                            <h4>Email</h4>
                            <p>info@birrflow.com</p>
                        </div>
                    </div>
                    <div className="contact-item">
                        <i className="fas fa-phone"></i>
                        <div>
                            <h4>Phone</h4>
                            <p>+251 900 000 000</p>
                        </div>
                    </div>
                    <div className="contact-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <div>
                            <h4>Office</h4>
                            <p>5kilo, Addis Ababa, Ethiopia</p>
                        </div>
                    </div>
                </div>
                <div className="contact-form">
                    <h3>Send us a Message</h3>
                    <form>
                        <div className="form-group">
                            <input type="text" placeholder="Your Name" required/>
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Your Email" required/>
                        </div>
                        <div className="form-group">
                            <textarea placeholder="Your Message" rows="4" required></textarea>
                        </div>
                        <button type="submit" className="btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    </main>
        </>
        
);
}
export default AboutUs;