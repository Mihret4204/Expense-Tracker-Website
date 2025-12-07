// BirrFlow Dashboard Controller
// Handles dashboard page functionality

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!auth.isLoggedIn()) {
        // Allow guest access but show limited data
        console.log('Guest mode - limited functionality');
    }

    initDashboard();
});

function initDashboard() {
    updateWelcomeMessage();
    updateBalanceDisplay();
    updateMiniCards();
    updateDate();
}

// Update welcome message with user name
function updateWelcomeMessage() {
    const welcomeEl = document.querySelector('.dashboard-header h1');
    const user = auth.getCurrentUser();
    
    if (welcomeEl && user) {
        welcomeEl.textContent = `Welcome back, ${user.name}!`;
    }
}

// Update the current date display
function updateDate() {
    const dateEl = document.querySelector('.dashboard-header .date');
    if (dateEl) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = new Date().toLocaleDateString('en-US', options);
    }
}

// Update balance display
function updateBalanceDisplay() {
    const totals = transactionManager.getTotals();
    
    // Update total balance
    const balanceAmountEl = document.querySelector('.balance-amount');
    if (balanceAmountEl) {
        balanceAmountEl.textContent = transactionManager.formatCurrency(totals.balance);
    }

    // Update balance change indicator
    const balanceChangeEl = document.querySelector('.balance-change');
    if (balanceChangeEl) {
        const monthly = transactionManager.getMonthlySummary();
        const percentChange = totals.income > 0 
            ? ((monthly.balance / totals.income) * 100).toFixed(1) 
            : 0;
        
        if (monthly.balance >= 0) {
            balanceChangeEl.className = 'balance-change positive';
            balanceChangeEl.innerHTML = `<i class="fas fa-arrow-up"></i> +${percentChange}% this month`;
        } else {
            balanceChangeEl.className = 'balance-change negative';
            balanceChangeEl.innerHTML = `<i class="fas fa-arrow-down"></i> ${percentChange}% this month`;
        }
    }
}

// Update mini cards (income and expense)
function updateMiniCards() {
    const totals = transactionManager.getTotals();

    // Update income card
    const incomeValueEl = document.querySelector('.mini-card.income .card-value');
    if (incomeValueEl) {
        incomeValueEl.textContent = transactionManager.formatCurrency(totals.income);
    }

    // Update expense card
    const expenseValueEl = document.querySelector('.mini-card.expense .card-value');
    if (expenseValueEl) {
        expenseValueEl.textContent = transactionManager.formatCurrency(totals.expenses);
    }
}

// Refresh dashboard data
function refreshDashboard() {
    transactionManager.loadTransactions();
    initDashboard();
}
