function History(){
    return(
        <>
        <main className="history-container">
        <header className="page-header">
            <h1>Transaction History</h1>
            <p>View and manage all your transactions</p>
        </header>

        <section className="filters-section">
            <div className="filter-tabs">
                <button className="filter-tab active" data-filter="all">All</button>
                <button className="filter-tab" data-filter="income">Income</button>
                <button className="filter-tab" data-filter="expenses">Expenses</button>
            </div>

            <div className="filter-controls">
                <div className="filter-group">
                    <label for="category-filter">Category</label>
                    <select id="category-filter">
                        <option value="food"><i className="fas fa-utensils"></i> Food & Dining</option>
                        <option value="groceries"><i className="fas fa-shopping-cart"></i> Groceries</option>
                        <option value="transportation"><i className="fas fa-car"></i> Transportation</option>
                        <option value="shopping"><i className="fas fa-shopping-bag"></i> Shopping</option>
                        <option value="entertainment"><i className="fas fa-film"></i> Entertainment</option>
                        <option value="bills"><i className="fas fa-file-invoice"></i> Bills & Utilities</option>
                        <option value="healthcare"><i className="fas fa-heart-pulse"></i> Healthcare</option>                            <option value="education"><i className="fas fa-graduation-cap"></i> Education</option>
                        <option value="other"><i className="fas fa-box"></i> Other</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label for="date-range">Date Range</label>
                    <select id="date-range">
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month" selected>This Month</option>
                        <option value="year">This Year</option>
                        <option value="all">All Time</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label for="sort-by">Sort By</label>
                    <select id="sort-by">
                        <option value="date-desc" selected>Date (Newest)</option>
                        <option value="date-asc">Date (Oldest)</option>
                        <option value="amount-desc">Amount (High to Low)</option>
                        <option value="amount-asc">Amount (Low to High)</option>
                    </select>
                </div>
            </div>
        </section>

        <section className="summary-section">
            <div className="summary-cards">
                <div className="summary-card">
                    <i className="fas fa-chart-line"></i>
                    <div className="summary-info">
                        <p className="summary-label">Total Transactions</p>
                        <p className="summary-value">47</p>
                    </div>
                </div>
                <div className="summary-card income">
                    <i className="fas fa-arrow-trend-up"></i>
                    <div className="summary-info">
                        <p className="summary-label">Total Income</p>
                        <p className="summary-value">ETB 30,000.00</p>
                    </div>
                </div>
                <div className="summary-card expense">
                    <i className="fas fa-arrow-trend-down"></i>
                    <div className="summary-info">
                        <p className="summary-label">Total Expenses</p>
                        <p className="summary-value">ETB 15,000.00</p>
                    </div>
                </div>
                <div className="summary-card balance">
                    <i className="fas fa-wallet"></i>
                    <div className="summary-info">
                        <p className="summary-label">Net Balance</p>
                        <p className="summary-value">ETB 15,000.00</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="transactions-list">
            <div className="list-header">
                <br/>
                <h3>Transactions</h3>
                <button className="export-btn">Export CSV</button>
            </div>

            <div className="transaction-items">
                <div className="transaction-item expense">
                    <div className="transaction-icon"><i className="fas fa-shopping-cart"></i></div>
                    <div className="transaction-details">
                        <p className="transaction-title">Grocery Shopping</p>
                        <p className="transaction-category">Food & Groceries</p>
                        <p className="transaction-date">Today, 2:30 PM</p>
                    </div>
                    <div className="transaction-amount negative">-ETB 943.43</div>
                    <div className="transaction-actions">
                        <button className="action-btn edit"><i className="fas fa-edit"></i></button>
                        <button className="action-btn delete"><i className="fas fa-trash"></i></button>
                    </div>
                </div>

                <div className="transaction-item income">
                    <div className="transaction-icon"><i className="fas fa-briefcase"></i></div>
                    <div className="transaction-details">
                        <p className="transaction-title">Salary</p>
                        <p className="transaction-category">Income</p>
                        <p className="transaction-date">Yesterday, 9:00 AM</p>
                    </div>
                    <div className="transaction-amount positive">+ETB 1,000.00</div>
                    <div className="transaction-actions">
                        <button className="action-btn edit"><i className="fas fa-edit"></i></button>
                        <button className="action-btn delete"><i className="fas fa-trash"></i></button>
                    </div>
                </div>

                <div className="transaction-item expense">
                    <div className="transaction-icon"><i className="fas fa-gas-pump"></i></div>
                    <div className="transaction-details">
                        <p className="transaction-title">Gas Station</p>
                        <p className="transaction-category">Transportation</p>
                        <p className="transaction-date">Yesterday, 6:15 PM</p>
                    </div>
                    <div className="transaction-amount negative">-ETB 600.00</div>
                    <div className="transaction-actions">
                        <button className="action-btn edit"><i className="fas fa-edit"></i></button>
                        <button className="action-btn delete"><i className="fas fa-trash"></i></button>
                    </div>
                </div>

                <div className="transaction-item expense">
                    <div className="transaction-icon"><i className="fas fa-utensils"></i></div>
                    <div className="transaction-details">
                        <p className="transaction-title">Restaurant</p>
                        <p className="transaction-category">Food & Dining</p>
                        <p className="transaction-date">Nov 27, 7:30 PM</p>
                    </div>
                    <div className="transaction-amount negative">-ETB 875.00</div>
                    <div className="transaction-actions">
                        <button className="action-btn edit"><i className="fas fa-edit"></i></button>
                        <button className="action-btn delete"><i className="fas fa-trash"></i></button>
                    </div>
                </div>

                <div className="transaction-item income">
                    <div className="transaction-icon"><i className="fas fa-laptop"></i></div>
                    <div className="transaction-details">
                        <p className="transaction-title">Freelance Project</p>
                        <p className="transaction-category">Freelance</p>
                        <p className="transaction-date">Nov 26, 3:00 PM</p>
                    </div>
                    <div className="transaction-amount positive">+ETB 4,500.00</div>
                    <div className="transaction-actions">
                        <button className="action-btn edit"><i className="fas fa-edit"></i></button>
                        <button className="action-btn delete"><i className="fas fa-trash"></i></button>
                    </div>
                </div>

                <div className="transaction-item expense">
                    <div className="transaction-icon"><i className="fas fa-film"></i></div>
                    <div className="transaction-details">
                        <p className="transaction-title">Movie Tickets</p>
                        <p className="transaction-category">Entertainment</p>
                        <p className="transaction-date">Nov 25, 8:00 PM</p>
                    </div>
                    <div className="transaction-amount negative">-ETB 616.00</div>
                    <div className="transaction-actions">
                        <button className="action-btn edit"><i className="fas fa-edit"></i></button>
                        <button className="action-btn delete"><i className="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>

            <div className="load-more">
                <button className="btn-secondary">Load More Transactions</button>
            </div>
        </section>
    </main>
    </>
);
}
export default History;