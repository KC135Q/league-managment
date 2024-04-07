import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import RequestAccess from "./components/Auth/RequestAccess";
import MainLayout from "./components/Layout/MainLayout";
import { AuthProvider } from "./components/Auth/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import NavBar from "./components/Layout/NavBar";
import GroupDetails from "./components/Group/GroupDetails";
import GroupManagement from "./components/Group/GroupManagement";

const App = () => {
  return (
    <AuthProvider>
      <NavBar />

      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/request-access" element={<RequestAccess />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<GroupManagement />} />
            {/* Nested route for group details */}
            <Route path="groups/:groupId" element={<GroupDetails />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
