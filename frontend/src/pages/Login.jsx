function Login(){
    return(
        <>
    <body className="login-page">
    <div className="login-wrapper">
        <div className="login-container">
            <div className="logo-section">
                <div className="logo">
                    <i className="fas fa-wallet"></i>
                    <h1>BirrFlow</h1>
                </div>
                <p className="tagline">Your Best Money Assistant</p>
            </div>
            
            <div className="login-form">
                <h2>Welcome Back</h2>
                <form id="loginForm" onsubmit="handleLogin(event)">
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required/>
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required/>
                    </div>
                    <button type="submit" className="btn-primary">Sign In</button>
                </form>
                
                <p className="signup-link">
                    New to BirrFlow? <a href="#" onclick="toggleForms(); return true;">Sign up</a>
                </p>
            </div>

            <div className="signup-form hidden">
                <h2>Create Account</h2>
                <form id="signupForm" onsubmit="handleSignup(event)">
                    <div className="form-group">
                        <label for="signup-name">Full Name</label>
                        <input type="text" id="signup-name" placeholder="Enter your name" required/>
                    </div>
                    <div className="form-group">
                        <label for="signup-email">Email</label>
                        <input type="email" id="signup-email" placeholder="Enter your email" required/>
                    </div>
                    <div className="form-group">
                        <label for="signup-password">Password</label>
                        <input type="password" id="signup-password" placeholder="Create a password" required minlength="6"/>
                    </div>
                    <div className="form-group">
                        <label for="signup-confirm">Confirm Password</label>
                        <input type="password" id="signup-confirm" placeholder="Confirm your password" required/>
                    </div>
                    <button type="submit" className="btn-primary">Sign Up</button>
                </form>
                
                <p className="signup-link">
                    Already have an account? <a href="#" onclick="toggleForms(); return false;">Sign in</a>
                </p>
            </div>
        </div>
    </div>
</body>
        </>
    );
}
export default Login;