// BirrFlow Transaction Management System
// Handles all transaction CRUD operations using localStorage

class TransactionManager {
    constructor() {
        this.transactions = [];
        this.init();
    }

    init() {
        this.loadTransactions();
    }

    // Get storage key for current user
    getStorageKey() {
        const user = auth.getCurrentUser();
        if (user) {
            return `birrflow_transactions_${user.id}`;
        }
        return 'birrflow_transactions_guest';
    }

    // Load transactions from localStorage
    loadTransactions() {
        const saved = localStorage.getItem(this.getStorageKey());
        this.transactions = saved ? JSON.parse(saved) : [];
        return this.transactions;
    }

    // Save transactions to localStorage
    saveTransactions() {
        localStorage.setItem(this.getStorageKey(), JSON.stringify(this.transactions));
    }

    // Add a new transaction
    addTransaction(transaction) {
        const newTransaction = {
            id: Date.now().toString(),
            type: transaction.type, // 'income' or 'expense'
            amount: parseFloat(transaction.amount),
            currency: transaction.currency || 'ETB',
            description: transaction.description,
            category: transaction.category,
            date: transaction.date,
            time: transaction.time || '12:00',
            createdAt: new Date().toISOString()
        };

        this.transactions.unshift(newTransaction); // Add to beginning
        this.saveTransactions();
        return { success: true, transaction: newTransaction };
    }

    // Update an existing transaction
    updateTransaction(id, updates) {
        const index = this.transactions.findIndex(t => t.id === id);
        
        if (index === -1) {
            return { success: false, message: 'Transaction not found!' };
        }

        this.transactions[index] = {
            ...this.transactions[index],
            ...updates,
            amount: parseFloat(updates.amount),
            updatedAt: new Date().toISOString()
        };

        this.saveTransactions();
        return { success: true, transaction: this.transactions[index] };
    }

    // Delete a transaction
    deleteTransaction(id) {
        const index = this.transactions.findIndex(t => t.id === id);
        
        if (index === -1) {
            return { success: false, message: 'Transaction not found!' };
        }

        this.transactions.splice(index, 1);
        this.saveTransactions();
        return { success: true, message: 'Transaction deleted!' };
    }

    // Get a single transaction by ID
    getTransaction(id) {
        return this.transactions.find(t => t.id === id);
    }

    // Get all transactions
    getAllTransactions() {
        return this.transactions;
    }

    // Get transactions by type
    getByType(type) {
        return this.transactions.filter(t => t.type === type);
    }

    // Get transactions by category
    getByCategory(category) {
        return this.transactions.filter(t => t.category === category);
    }

    // Get transactions by date range
    getByDateRange(startDate, endDate) {
        return this.transactions.filter(t => {
            const transDate = new Date(t.date);
            return transDate >= new Date(startDate) && transDate <= new Date(endDate);
        });
    }

    // Filter transactions
    filterTransactions(filters) {
        let filtered = [...this.transactions];

        if (filters.type && filters.type !== 'all') {
            filtered = filtered.filter(t => t.type === filters.type);
        }

        if (filters.category && filters.category !== 'all') {
            filtered = filtered.filter(t => t.category === filters.category);
        }

        if (filters.dateRange) {
            const today = new Date();
            let startDate;

            switch (filters.dateRange) {
                case 'today':
                    startDate = new Date(today.setHours(0, 0, 0, 0));
                    break;
                case 'week':
                    startDate = new Date(today.setDate(today.getDate() - 7));
                    break;
                case 'month':
                    startDate = new Date(today.setMonth(today.getMonth() - 1));
                    break;
                case 'year':
                    startDate = new Date(today.setFullYear(today.getFullYear() - 1));
                    break;
                default:
                    startDate = null;
            }

            if (startDate) {
                filtered = filtered.filter(t => new Date(t.date) >= startDate);
            }
        }

        // Sort
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'date-desc':
                    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                case 'date-asc':
                    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
                    break;
                case 'amount-desc':
                    filtered.sort((a, b) => b.amount - a.amount);
                    break;
                case 'amount-asc':
                    filtered.sort((a, b) => a.amount - b.amount);
                    break;
            }
        }

        return filtered;
    }

    // Calculate totals
    getTotals() {
        const income = this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            income: income,
            expenses: expenses,
            balance: income - expenses,
            totalTransactions: this.transactions.length
        };
    }

    // Get monthly summary
    getMonthlySummary() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const monthlyTransactions = this.transactions.filter(t => {
            const date = new Date(t.date);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        });

        const income = monthlyTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = monthlyTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            income: income,
            expenses: expenses,
            balance: income - expenses,
            transactions: monthlyTransactions.length
        };
    }

    // Format currency
    formatCurrency(amount, currency = 'ETB') {
        return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // Get category icon
    getCategoryIcon(category) {
        const icons = {
            'food': 'fa-utensils',
            'groceries': 'fa-shopping-cart',
            'transportation': 'fa-car',
            'shopping': 'fa-shopping-bag',
            'entertainment': 'fa-film',
            'bills': 'fa-file-invoice',
            'healthcare': 'fa-heart-pulse',
            'education': 'fa-graduation-cap',
            'salary': 'fa-briefcase',
            'freelance': 'fa-laptop',
            'investment': 'fa-chart-line',
            'gift': 'fa-gift',
            'other': 'fa-box',
            'other-income': 'fa-coins'
        };
        return icons[category] || 'fa-circle';
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    }

    // Export transactions to CSV
    exportToCSV() {
        const headers = ['Date', 'Time', 'Type', 'Category', 'Description', 'Amount', 'Currency'];
        const rows = this.transactions.map(t => [
            t.date,
            t.time,
            t.type,
            t.category,
            t.description,
            t.amount,
            t.currency
        ]);

        const csvContent = [headers, ...rows]
            .map(row => row.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `birrflow_transactions_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

// Create global transaction manager instance
const transactionManager = new TransactionManager();
