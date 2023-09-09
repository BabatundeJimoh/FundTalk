import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import SignUp from "./component/SignUp";
import Dashboard from "./component/Dashboard";
function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default Routing;
