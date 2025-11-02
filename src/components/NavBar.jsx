import React from "react";
import { Link, NavLink } from "react-router-dom";
import CartWidget from "./CartWidget";

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🧉 Tienda de Termos
      </Link>

      <ul className="navbar-links">
        <li><NavLink to="/">Inicio</NavLink></li>
        <li><NavLink to="/category/acero">Acero</NavLink></li>
        <li><NavLink to="/category/plastico">Plástico</NavLink></li>
        <li><NavLink to="/category/vidrio">Vidrio</NavLink></li>
      </ul>

      <CartWidget />
    </nav>
  );
}

export default NavBar;
