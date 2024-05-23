import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/home");
  };

  const handleAdd = () => {
    navigate("/AddTransactions");
  };

  const handleAll = () => {
    navigate("/AllTransactions");
  };

  return (
    <nav className="navbar">
      <div className="navbar-title" onClick={handleHome}>
        BudgetSheet
      </div>
      <ul className="navbar-options">
        <li className="navbar-option" onClick={handleAll}>
          All Transactions
        </li>
        <li className="navbar-option" onClick={handleAdd}>
          Add Transaction
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
