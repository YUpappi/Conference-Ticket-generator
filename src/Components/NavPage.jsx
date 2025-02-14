import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";

function NavPage() {
  return (
    <nav className="nav">
      <Logo />
      <ul>
        <li>
          <NavLink to="/">Events</NavLink>
        </li>
        <li>
          <NavLink to="/">My Tickets</NavLink>
        </li>
        <li>
          <NavLink to="/">About Project</NavLink>
        </li>
      </ul>
      <Link className="ticket-link">my tickets</Link>
    </nav>
  );
}

export default NavPage;
