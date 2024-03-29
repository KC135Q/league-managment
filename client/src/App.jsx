import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import RequestAccess from "./components/Auth/RequestAccess";
import MainLayout from "./components/Layout/MainLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/request-access" element={<RequestAccess />} />
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
