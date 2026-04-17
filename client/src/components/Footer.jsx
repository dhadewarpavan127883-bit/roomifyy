const Footer = () => {
  return (
    <footer className="py-5 mt-auto">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-md-4 text-center text-md-start">
            <h4 className="fw-bold mb-1 text-primary">RoomRentals</h4>
            <p className="small text-muted mb-0">Discover your next home with ease and confidence.</p>
          </div>
          <div className="col-md-4 text-center">
            <div className="d-flex justify-content-center gap-3 fs-4 text-primary">
              <i className="bi bi-facebook pointer"></i>
              <i className="bi bi-instagram pointer"></i>
              <i className="bi bi-twitter pointer"></i>
              <i className="bi bi-linkedin pointer"></i>
            </div>
          </div>
          <div className="col-md-4 text-center text-md-end text-muted small">
            &copy; {new Date().getFullYear()} Modern Living Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
