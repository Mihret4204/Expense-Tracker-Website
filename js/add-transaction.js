// BirrFlow Add Transaction Controller
// Handles add/edit transaction page functionality

let currentTransactionType = 'expense';
let editingTransactionId = null;

document.addEventListener('DOMContentLoaded', () => {
    initAddTransactionPage();
});

function initAddTransactionPage() {
    setupTypeSelector();
    setupForm();
    setDefaultDateTime();
    checkForEditMode();
}

// Setup transaction type selector (expense/income)
function setupTypeSelector() {
    const typeBtns = document.querySelectorAll('.type-btn');
    
    typeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            typeBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            // Update current type
            currentTransactionType = btn.dataset.type;
            // Update category options based on type
            updateCategoryOptions();
        });
    });
}

// Update category dropdown based on transaction type
function updateCategoryOptions() {
    const categorySelect = document.getElementById('category');
    if (!categorySelect) return;

    const expenseCategories = `
        <option value="">Select a category</option>
        <option value="food">Food & Dining</option>
        <option value="groceries">Groceries</option>
        <option value="transportation">Transportation</option>
        <option value="shopping">Shopping</option>
        <option value="entertainment">Entertainment</option>
        <option value="bills">Bills & Utilities</option>
        <option value="healthcare">Healthcare</option>
        <option value="education">Education</option>
        <option value="other">Other</option>
    `;

    const incomeCategories = `
        <option value="">Select a category</option>
        <option value="salary">Salary</option>
        <option value="freelance">Freelance</option>
        <option value="investment">Investment</option>
        <option value="gift">Gift</option>
        <option value="other-income">Other</option>
    `;

    categorySelect.innerHTML = currentTransactionType === 'expense' 
        ? expenseCategories 
        : incomeCategories;
}

// Setup form submission
function setupForm() {
    const form = document.querySelector('.transaction-form');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    // Cancel button
    const cancelBtn = document.querySelector('.btn-secondary');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to cancel?')) {
                window.location.href = 'dashboard.html';
            }
        });
    }
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const formData = {
        type: currentTransactionType,
        amount: document.getElementById('amount').value,
        currency: document.getElementById('currency-select').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };

    // Validate
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
        showNotification('Please enter a valid amount!', 'error');
        return;
    }

    if (!formData.description.trim()) {
        showNotification('Please enter a description!', 'error');
        return;
    }

    if (!formData.category) {
        showNotification('Please select a category!', 'error');
        return;
    }

    if (!formData.date) {
        showNotification('Please select a date!', 'error');
        return;
    }

    let result;
    if (editingTransactionId) {
        // Update existing transaction
        result = transactionManager.updateTransaction(editingTransactionId, formData);
        if (result.success) {
            showNotification('Transaction updated successfully!', 'success');
        }
    } else {
        // Add new transaction
        result = transactionManager.addTransaction(formData);
        if (result.success) {
            showNotification('Transaction saved successfully!', 'success');
        }
    }

    if (result.success) {
        // Redirect after short delay
        setTimeout(() => {
            window.location.href = 'history.html';
        }, 1500);
    } else {
        showNotification(result.message || 'Error saving transaction!', 'error');
    }
}

// Set default date and time to now
function setDefaultDateTime() {
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    if (timeInput) {
        const now = new Date();
        timeInput.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }
}

// Check if we're editing an existing transaction
function checkForEditMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    
    if (editId) {
        editingTransactionId = editId;
        loadTransactionForEdit(editId);
    }
}

// Load transaction data for editing
function loadTransactionForEdit(id) {
    const transaction = transactionManager.getTransaction(id);
    
    if (!transaction) {
        showNotification('Transaction not found!', 'error');
        return;
    }

    // Update page title
    const pageTitle = document.querySelector('.page-header h1');
    if (pageTitle) {
        pageTitle.textContent = 'Edit Transaction';
    }

    // Set transaction type
    currentTransactionType = transaction.type;
    const typeBtns = document.querySelectorAll('.type-btn');
    typeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === transaction.type);
    });

    // Update categories for the type
    updateCategoryOptions();

    // Fill form fields
    document.getElementById('amount').value = transaction.amount;
    document.getElementById('currency-select').value = transaction.currency || 'ETB';
    document.getElementById('description').value = transaction.description;
    document.getElementById('category').value = transaction.category;
    document.getElementById('date').value = transaction.date;
    document.getElementById('time').value = transaction.time || '12:00';

    // Update submit button text
    const submitBtn = document.querySelector('.btn-primary[type="submit"]');
    if (submitBtn) {
        submitBtn.textContent = 'Update Transaction';
    }
}

// Show notification
function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 6px;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${type === 'error' 
            ? 'background: #fee2e2; color: #dc2626; border: 1px solid #fecaca;' 
            : 'background: #d1fae5; color: #059669; border: 1px solid #a7f3d0;'}
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
