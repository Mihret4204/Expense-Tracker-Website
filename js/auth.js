// BirrFlow Authentication System
// Handles user registration, login, logout using localStorage

class Auth {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('birrflow_currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
    }

    // Get all registered users
    getUsers() {
        const users = localStorage.getItem('birrflow_users');
        return users ? JSON.parse(users) : [];
    }

    // Save users to localStorage
    saveUsers(users) {
        localStorage.setItem('birrflow_users', JSON.stringify(users));
    }

    // Register a new user
    register(name, email, password) {
        const users = this.getUsers();
        
        // Check if email already exists
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { success: false, message: 'Email already registered!' };
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: name,
            email: email.toLowerCase(),
            password: password, // In production, this should be hashed!
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        this.saveUsers(users);

        // Initialize empty transactions for new user
        localStorage.setItem(`birrflow_transactions_${newUser.id}`, JSON.stringify([]));

        return { success: true, message: 'Registration successful!', user: newUser };
    }

    // Login user
    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => 
            u.email.toLowerCase() === email.toLowerCase() && 
            u.password === password
        );

        if (user) {
            this.currentUser = user;
            localStorage.setItem('birrflow_currentUser', JSON.stringify(user));
            return { success: true, message: 'Login successful!', user: user };
        }

        return { success: false, message: 'Invalid email or password!' };
    }

    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('birrflow_currentUser');
        window.location.href = 'index.html';
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Update user profile
    updateProfile(name, email) {
        if (!this.currentUser) return { success: false, message: 'Not logged in!' };

        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex === -1) return { success: false, message: 'User not found!' };

        // Check if new email is already taken by another user
        const emailTaken = users.find(u => 
            u.email.toLowerCase() === email.toLowerCase() && 
            u.id !== this.currentUser.id
        );
        if (emailTaken) {
            return { success: false, message: 'Email already in use!' };
        }

        users[userIndex].name = name;
        users[userIndex].email = email.toLowerCase();
        this.saveUsers(users);

        this.currentUser = users[userIndex];
        localStorage.setItem('birrflow_currentUser', JSON.stringify(this.currentUser));

        return { success: true, message: 'Profile updated!' };
    }

    // Change password
    changePassword(currentPassword, newPassword) {
        if (!this.currentUser) return { success: false, message: 'Not logged in!' };

        if (this.currentUser.password !== currentPassword) {
            return { success: false, message: 'Current password is incorrect!' };
        }

        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex === -1) return { success: false, message: 'User not found!' };

        users[userIndex].password = newPassword;
        this.saveUsers(users);

        this.currentUser = users[userIndex];
        localStorage.setItem('birrflow_currentUser', JSON.stringify(this.currentUser));

        return { success: true, message: 'Password changed successfully!' };
    }

    // Protect page - redirect to login if not authenticated
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }
}

// Create global auth instance
const auth = new Auth();

// Login form handler
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const result = auth.login(email, password);

    if (result.success) {
        window.location.href = 'dashboard.html';
    } else {
        showMessage(result.message, 'error');
    }
}

// Signup form handler
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;

    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('Password must be at least 6 characters!', 'error');
        return;
    }

    const result = auth.register(name, email, password);

    if (result.success) {
        showMessage('Registration successful! Please login.', 'success');
        // Switch to login form
        setTimeout(() => {
            toggleForms();
        }, 1500);
    } else {
        showMessage(result.message, 'error');
    }
}

// Show message to user
function showMessage(message, type) {
    // Remove existing message
    const existingMsg = document.querySelector('.auth-message');
    if (existingMsg) existingMsg.remove();

    const msgDiv = document.createElement('div');
    msgDiv.className = `auth-message ${type}`;
    msgDiv.textContent = message;
    msgDiv.style.cssText = `
        padding: 10px 15px;
        margin-bottom: 15px;
        border-radius: 6px;
        text-align: center;
        font-size: 0.9rem;
        ${type === 'error' ? 'background: #fee2e2; color: #dc2626;' : 'background: #d1fae5; color: #059669;'}
    `;

    const form = document.querySelector('.login-form form') || document.querySelector('.signup-form form');
    if (form) {
        form.insertBefore(msgDiv, form.firstChild);
    }

    // Auto remove after 3 seconds
    setTimeout(() => msgDiv.remove(), 3000);
}

// Toggle between login and signup forms
function toggleForms() {
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    
    if (loginForm && signupForm) {
        loginForm.classList.toggle('hidden');
        signupForm.classList.toggle('hidden');
    }
}

// Update UI based on login status
function updateAuthUI() {
    const user = auth.getCurrentUser();
    const loginLink = document.querySelector('a[href="index.html"]');
    
    if (user && loginLink) {
        loginLink.textContent = 'Logout';
        loginLink.href = '#';
        loginLink.onclick = (e) => {
            e.preventDefault();
            auth.logout();
        };
    }

    // Update welcome message if exists
    const welcomeMsg = document.querySelector('.dashboard-header h1');
    if (welcomeMsg && user) {
        welcomeMsg.textContent = `Welcome back, ${user.name}!`;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
});
