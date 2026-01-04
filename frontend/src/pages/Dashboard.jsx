import { Link } from "react-router-dom";
function Dashboard() {
    return (
        <>
            <div className="dashboard-page">
                  <main className="dashboard-container">
                    <header className="dashboard-header">
                        <h1>Welcome back!</h1>
                        <p className="date">November 27, 2025</p>
                    </header>
                    <section className="balance-section">
                        <div className="balance-card">
                            <h2>Total Balance</h2>
                            <div className="balance-amount">ETB 10,000</div>
                            <div className="balance-change positive">
                                <i className="fas fa-arrow-up"></i> +12.5% this month
                            </div>
                        </div>

                        <div className="mini-cards">
                            <div className="mini-card income">
                                <i className="fas fa-arrow-trend-up"></i>
                                <div className="card-info">
                                    <p className="card-label">Income</p>
                                    <p className="card-value">ETB 30,000.00</p>
                                </div>
                            </div>
                            <div className="mini-card expense">
                                <i className="fas fa-arrow-trend-down"></i>
                                <div className="card-info">
                                    <p className="card-label">Expenses</p>
                                    <p className="card-value">ETB 15,000.00</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="quick-actions">
                        <h2>Quick Actions</h2>
                        <div className="action-buttons">
                            <Link to="/add-transaction" className="action-btn add-expense">
                                <i className="fas fa-minus-circle"></i>
                                <span>Add Expense</span>
                            </Link><br/>
                                <Link to="/add-transaction" className="action-btn add-income">
                                    <i className="fas fa-plus-circle"></i>
                                    <span>Add Income</span>
                                </Link><br/>
                                <Link to="/history" className="action-btn view-history">
                                        <i className="fas fa-chart-line"></i>
                                        <span>View History</span>
                                </Link>

                                </div>
                            </section>
                        </main>
                    </div>
                </>

                );
}
export default Dashboard;