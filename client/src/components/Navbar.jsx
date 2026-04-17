import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-houses-fill me-2 fs-3"></i>
          RoomRentals
        </Link>
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <i className="bi bi-list fs-2"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/rooms">All Listings</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {user ? (
              <div className="dropdown">
                <button className="btn btn-outline-primary dropdown-toggle fw-bold" type="button" data-bs-toggle="dropdown">
                  <i className="bi bi-person-circle me-2"></i>
                  {user.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-3 p-2">
                  <li><button className="dropdown-item rounded" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-link text-decoration-none text-dark fw-semibold">Login</Link>
                <Link to="/register" className="btn btn-primary px-4 shadow-sm">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
