// BirrFlow History Page Controller
// Handles transaction history display, filtering, editing, and deletion

let currentFilters = {
    type: 'all',
    category: 'all',
    dateRange: 'all',
    sortBy: 'date-desc'
};

document.addEventListener('DOMContentLoaded', () => {
    initHistoryPage();
});

function initHistoryPage() {
    setupFilterTabs();
    setupFilterControls();
    setupExportButton();
    loadAndDisplayTransactions();
    updateSummaryCards();
}

// Setup filter tabs (All, Income, Expenses)
function setupFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update filter
            const filterType = tab.dataset.filter;
            if (filterType === 'all') {
                currentFilters.type = 'all';
            } else if (filterType === 'income') {
                currentFilters.type = 'income';
            } else if (filterType === 'expenses') {
                currentFilters.type = 'expense';
            }
            
            loadAndDisplayTransactions();
        });
    });
}

// Setup filter controls (category, date range, sort)
function setupFilterControls() {
    const categoryFilter = document.getElementById('category-filter');
    const dateRangeFilter = document.getElementById('date-range');
    const sortByFilter = document.getElementById('sort-by');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            currentFilters.category = e.target.value;
            loadAndDisplayTransactions();
        });
    }

    if (dateRangeFilter) {
        dateRangeFilter.addEventListener('change', (e) => {
            currentFilters.dateRange = e.target.value;
            loadAndDisplayTransactions();
        });
    }

    if (sortByFilter) {
        sortByFilter.addEventListener('change', (e) => {
            currentFilters.sortBy = e.target.value;
            loadAndDisplayTransactions();
        });
    }
}

// Setup export button
function setupExportButton() {
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            transactionManager.exportToCSV();
            showNotification('Transactions exported successfully!', 'success');
        });
    }
}

// Load and display transactions
function loadAndDisplayTransactions() {
    const transactions = transactionManager.filterTransactions(currentFilters);
    const container = document.querySelector('.transaction-items');
    
    if (!container) return;

    if (transactions.length === 0) {
        container.innerHTML = `
            <div class="no-transactions" style="text-align: center; padding: 40px; color: #64748b;">
                <i class="fas fa-receipt" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No transactions found</p>
                <a href="add-transaction.html" class="btn-primary" style="display: inline-block; margin-top: 1rem; width: auto; padding: 10px 20px;">
                    Add Your First Transaction
                </a>
            </div>
        `;
        return;
    }

    container.innerHTML = transactions.map(t => createTransactionHTML(t)).join('');

    // Attach event listeners to action buttons
    attachActionListeners();
}

// Create HTML for a single transaction
function createTransactionHTML(transaction) {
    const icon = transactionManager.getCategoryIcon(transaction.category);
    const formattedDate = transactionManager.formatDate(transaction.date);
    const amountClass = transaction.type === 'income' ? 'positive' : 'negative';
    const amountPrefix = transaction.type === 'income' ? '+' : '-';
    const formattedAmount = transactionManager.formatCurrency(transaction.amount, transaction.currency);

    return `
        <div class="transaction-item ${transaction.type}" data-id="${transaction.id}">
            <div class="transaction-icon"><i class="fas ${icon}"></i></div>
            <div class="transaction-details">
                <p class="transaction-title">${escapeHtml(transaction.description)}</p>
                <p class="transaction-category">${formatCategory(transaction.category)}</p>
                <p class="transaction-date">${formattedDate}, ${transaction.time || '12:00'}</p>
            </div>
            <div class="transaction-amount ${amountClass}">${amountPrefix}${formattedAmount}</div>
            <div class="transaction-actions">
                <button class="action-btn edit" data-id="${transaction.id}" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" data-id="${transaction.id}" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

// Attach event listeners to edit and delete buttons
function attachActionListeners() {
    // Edit buttons
    document.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            window.location.href = `add-transaction.html?edit=${id}`;
        });
    });

    // Delete buttons
    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            confirmDelete(id);
        });
    });
}

// Confirm and delete transaction
function confirmDelete(id) {
    const transaction = transactionManager.getTransaction(id);
    if (!transaction) return;

    if (confirm(`Are you sure you want to delete "${transaction.description}"?`)) {
        const result = transactionManager.deleteTransaction(id);
        if (result.success) {
            showNotification('Transaction deleted!', 'success');
            loadAndDisplayTransactions();
            updateSummaryCards();
        } else {
            showNotification(result.message, 'error');
        }
    }
}

// Update summary cards
function updateSummaryCards() {
    const totals = transactionManager.getTotals();

    // Total transactions
    const totalTransEl = document.querySelector('.summary-card:not(.income):not(.expense):not(.balance) .summary-value');
    if (totalTransEl) {
        totalTransEl.textContent = totals.totalTransactions;
    }

    // Total income
    const incomeEl = document.querySelector('.summary-card.income .summary-value');
    if (incomeEl) {
        incomeEl.textContent = transactionManager.formatCurrency(totals.income);
    }

    // Total expenses
    const expenseEl = document.querySelector('.summary-card.expense .summary-value');
    if (expenseEl) {
        expenseEl.textContent = transactionManager.formatCurrency(totals.expenses);
    }

    // Net balance
    const balanceEl = document.querySelector('.summary-card.balance .summary-value');
    if (balanceEl) {
        balanceEl.textContent = transactionManager.formatCurrency(totals.balance);
    }
}

// Format category name for display
function formatCategory(category) {
    const categoryNames = {
        'food': 'Food & Dining',
        'groceries': 'Groceries',
        'transportation': 'Transportation',
        'shopping': 'Shopping',
        'entertainment': 'Entertainment',
        'bills': 'Bills & Utilities',
        'healthcare': 'Healthcare',
        'education': 'Education',
        'salary': 'Salary',
        'freelance': 'Freelance',
        'investment': 'Investment',
        'gift': 'Gift',
        'other': 'Other',
        'other-income': 'Other Income'
    };
    return categoryNames[category] || category;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show notification
function showNotification(message, type) {
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

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Load more transactions (pagination)
function loadMoreTransactions() {
    // For now, all transactions are loaded at once
    // This can be extended for pagination if needed
    showNotification('All transactions loaded!', 'success');
}

// Setup load more button
const loadMoreBtn = document.querySelector('.load-more .btn-secondary');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreTransactions);
}
