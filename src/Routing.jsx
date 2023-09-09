import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import SignUp from "./component/SignUp";

function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default Routing;
