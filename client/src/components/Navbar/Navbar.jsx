import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <header className="nav__header">Event Management System</header>
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink className="nav__link" to="/">
            Events
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav__link" to="/volunteers">
            Volunteers
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
