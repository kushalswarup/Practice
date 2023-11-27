import { useState } from "react";
import "./App.css";

function App() {
  const [monthlyAmount, setmonthlyAmount] = useState(0);
  const [totalPaymentAmount, settotalPaymentAmount] = useState(0);
  const [totalInterestPaid, settotalInterestPaid] = useState(0);

  const handlesubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const loanamount = parseFloat(data.get("loan-amount"));
    const loanterm = parseFloat(data.get("loan-term"));
    const interestrate = parseFloat(data.get("interest-rate"));

    const monthlyinterestrate = interestrate / 100 / 12;
    const loanterminmonths = loanterm * 12;

    const monthlypaymentamount =
      (loanamount * monthlyinterestrate) /
      (1 - 1 / Math.pow(1 + monthlyinterestrate, loanterminmonths));
    const totalpayment = loanterminmonths * monthlypaymentamount;

    setmonthlyAmount(monthlypaymentamount);
    settotalPaymentAmount(totalpayment);
    settotalInterestPaid(totalpayment - loanamount);
  };
  return (
    <>
      <h1>Kushal's Mortgage Calculator</h1>
      <form onSubmit={handlesubmit}>
        <div>
          <label>
            Loan Amount:
            <input type="number" name="loan-amount" min="1" required></input>
          </label>
        </div>

        <div>
          <label>
            Loan Term (years):
            <input type="number" name="loan-term" min="1" required></input>
          </label>
        </div>
        <div>
          <label>
            Interest Rate (%):
            <input
              type="number"
              name="interest-rate"
              min="1"
              step="0.01"
              required
            ></input>
          </label>
        </div>
        <div>
          <button type="submit">Calculate</button>
        </div>
      </form>

      <div className="results">
        <div>Monthly paid amount: {monthlyAmount}</div>

        <div>Total payment Amount: {totalPaymentAmount}</div>
        <div>Total interest paid: {totalInterestPaid}</div>
      </div>
    </>
  );
}

export default App;
