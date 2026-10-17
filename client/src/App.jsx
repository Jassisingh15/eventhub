import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

// Pages that should NOT show the Navbar and Footer
const AUTH_PAGES = ["/login", "/register"];

function AppLayout() {
  const location = useLocation();
  const hideNavbarAndFooter = AUTH_PAGES.includes(location.pathname);

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url('/eventora-bg.png')" }}
    >

      {/* Navbar */}
      {!hideNavbarAndFooter && <Navbar />}

      {/* Main Content */}
      {/* On auth pages (login/register) the main area acts as a centered
          flex container so the form card is centered on the screen. */}
      <main
        className={`flex-grow w-full ${
          hideNavbarAndFooter ? "flex items-center justify-center" : ""
        }`}
      >
        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/events/:id"
            element={<EventDetail />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/dashboard"
            element={<UserDashboard />}
          />

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/payment-success"
            element={<PaymentSuccess />}
          />

          <Route
            path="/payment-failed"
            element={<PaymentFailed />}
          />

          <Route
            path="*"
            element={
              <h1 className="mt-20 text-center text-3xl font-bold">
                404 - Page Not Found
              </h1>
            }
          />

        </Routes>
      </main>

      {/* Footer */}
      {!hideNavbarAndFooter && <Footer />}

    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
