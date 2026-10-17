import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { FaBars, FaTimes, FaTicketAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const scrollToSection = (sectionId) => {
    closeMenu();

    if (location.pathname === "/") {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isHomePage = location.pathname === "/";
  const navTextColor = "text-[#18352D]";

  return (
    <nav
      className={`${
        isHomePage ? "absolute" : "relative"
      } z-50 w-full bg-transparent`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* LOGO */}

        <Link
          to="/"
          onClick={closeMenu}
          className={`flex items-center gap-2 text-xl font-extrabold tracking-tight ${navTextColor}`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#397565] text-white">
            <FaTicketAlt />
          </span>
          Eventora
        </Link>

        {/* MOBILE BUTTON */}

        <button
          className={`${navTextColor} md:hidden`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes size={21} /> : <FaBars size={21} />}
        </button>

        {/* NAVIGATION */}

        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col gap-5 px-6 py-6 md:contents`}
        >
          {/* LINKS */}

          <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-[0.12em] text-[#18352D]/75 md:absolute md:left-[52%] md:top-[calc(50%+4px)] md:-translate-x-1/2 md:-translate-y-1/2 md:flex-row md:items-center md:gap-8">
            {/* HOME */}

            <Link
              onClick={closeMenu}
              to="/"
              className="group relative transition hover:text-[#397565]"
            >
              Home
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#18352D] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* EVENTS */}

            <Link
              onClick={() => scrollToSection("events")}
              to="/#events"
              className="group relative transition hover:text-[#397565]"
            >
              Events
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#18352D] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* CATEGORIES */}

            <Link
              onClick={() => scrollToSection("categories")}
              to="/#categories"
              className="group relative transition hover:text-[#397565]"
            >
              Categories
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#18352D] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* ABOUT */}

            <Link
              onClick={() => scrollToSection("about")}
              to="/#about"
              className="group relative transition hover:text-[#397565]"
            >
              About
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#18352D] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* RIGHT SIDE */}

          <div className="flex flex-col gap-3 md:absolute md:right-5 md:flex-row md:items-center">
            {user ? (
              <>
                {/* DASHBOARD */}

                <Link
                  onClick={closeMenu}
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  className="button-primary !bg-[#18352D] !py-2.5 !text-white hover:!bg-[#2E6254]"
                >
                  {user.name?.split(" ")[0] || "Dashboard"}
                </Link>

                {/* LOGOUT */}

                <button
                  onClick={handleLogout}
                  className="rounded-full bg-[#8A6A4A] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#715536]"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                {/* LOGIN */}

                <Link
                  onClick={closeMenu}
                  to="/login"
                  className={`text-sm font-bold ${navTextColor}`}
                >
                  Log in
                </Link>

                {/* REGISTER */}

                <Link
                  onClick={closeMenu}
                  to="/register"
                  className="button-primary !bg-[#397565] !py-2.5 !text-white hover:!bg-[#2E6254]"
                >
                  Join Eventora
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
