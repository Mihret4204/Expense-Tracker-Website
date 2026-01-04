function AddTransaction(){
    return(
        <>
        <main className="add-transaction-container">
        <header className="page-header">
            <h1>Add Transaction</h1>
            <p>Track your income and expenses</p>
        </header>

        <div className="transaction-type-selector">
            <button className="type-btn active" data-type="expense">
                <i className="fas fa-arrow-trend-down"></i>
                <span>Expense</span>
            </button>
            <button className="type-btn" data-type="income">
                <i className="fas fa-arrow-trend-up"></i>
                <span>Income</span>
            </button>
        </div>

        <form className="transaction-form">
            <div className="form-section">
                <h3>Transaction Details</h3>
                
                <div className="form-group">
                    <label for="amount">Amount</label>
                    <div className="input-with-prefix" >
                        <select id="currency-select">
                            <option value="ETB">ETB</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="AUD">AUD</option>
                            <option value="CAD">CAD</option>
                            <option value="NZD">NZD</option>
                            <option value="CHF">CHF</option>
                            <option value="JPY">JPY</option>
                            <option value="CNY">CNY</option>
                        </select>
                        <input type="number" id="amount" placeholder="0.00" step="0.01" required/>
                    </div>
                </div>

                <div className="form-group">
                    <label for="description">Description</label>
                    <input type="text" id="description" placeholder="What was this transaction for?" required/>
                </div>

                <div className="form-group">
                    <label for="category">Category</label>
                    <select id="category" required>
                        <option value="">Select a category</option>
                        <optgroup label="Expenses">
                            <option value="food"> Food & Dining</option>
                            <option value="groceries"> Groceries</option>
                            <option value="transportation"> Transportation</option>
                            <option value="shopping"> Shopping</option>
                            <option value="entertainment"> Entertainment</option>
                            <option value="bills"> Bills & Utilities</option>
                            <option value="healthcare"> Healthcare</option>
                            <option value="education"> Education</option>
                            <option value="other"> Other</option>
                        </optgroup>
                        <optgroup label="Income">
                            <option value="salary"> Salary</option>
                            <option value="freelance"> Freelance</option>
                            <option value="investment">investment</option>
                            <option value="gift"> Gift</option>
                            <option value="other-income"> Other</option>
                        </optgroup>
                    </select>
                </div>

                <div className="form-group">
                    <label for="date">Date</label>
                    <input type="date" id="date" required/>
                </div>

                <div className="form-group">
                    <label for="time">Time</label>
                    <input type="time" id="time" required/>
                </div>
            </div>

            <div className="form-actions">
                <button type="button" className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Transaction</button>
            </div>
        </form>
        
    </main>
    </>
    );
}
export default AddTransaction;