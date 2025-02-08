import { Outlet, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="navbar bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            Books Hub
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to="/books">
                Books
              </Link>
              <Link className="nav-link" to="/members">
                Member
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
