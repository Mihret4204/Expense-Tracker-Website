import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <i className="fas fa-wallet"></i>
        <span>BirrFlow</span>
      </div>

      <div className="nav-links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          end
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/add-transaction"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Add
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          History
        </NavLink>

        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          About us
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;
