import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import SignUp from "./component/SignUp";
import Dashboard from "./component/Dashboard";

function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Home />} />
      </Routes>
    </div>
  );
}

export default Routing;
