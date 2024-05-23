import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTrasactions from "./Components/AddTrasactions";
import AllTransactions from "./Components/AllTransactions";
import Dashboard from "./Dashboard/Dashboard";
import Home from "./Dashboard/Home/Home";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/AllTransactions" element={<AllTransactions />} />
          <Route path="/AddTransactions" element={<AddTrasactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
