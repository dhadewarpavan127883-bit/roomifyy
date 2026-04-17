import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RoomCard from '../components/RoomCard';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async (query = '') => {
    try {
      const url = query ? `/api/rooms?query=${query}` : '/api/rooms';
      const res = await axios.get(url);
      setRooms(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRooms(search);
  };

  return (
    <div>
      <section className="hero text-center">
        <div className="container py-5">
          <h1 className="display-3 fw-bold mb-4">Find Your Perfect Haven</h1>
          <p className="lead mb-5 opacity-90 mx-auto" style={{ maxWidth: '600px' }}>
            Discover thousands of hand-picked rooms in your favorite locations. Affordable, verified, and ready for move-in.
          </p>
          <form className="search-box" onSubmit={handleSearch}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by city or area..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary btn-lg rounded-pill px-5 py-3 shadow" type="submit">
              Search Now
            </button>
          </form>
        </div>
      </section>

      <section className="container py-5 mt-5">
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h2 className="fw-bold mb-1">Featured Properties</h2>
            <p className="text-muted mb-0">Explore our most popular room listings</p>
          </div>
          <Link to="/rooms" className="btn btn-link text-primary fw-bold text-decoration-none p-0">
            View All Listings <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
        
        {rooms.length === 0 ? (
          <div className="text-center p-5 bg-white rounded-4 shadow-sm">
            <i className="bi bi-search text-muted display-1 mb-3"></i>
            <p className="fs-5 text-muted">No rooms matching your search. Try another location!</p>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {rooms
              .filter(r => 
                !search || 
                r.title.toLowerCase().includes(search.toLowerCase()) || 
                r.location.toLowerCase().includes(search.toLowerCase())
              )
              .slice(0, 6)
              .map(room => (
                <div className="col" key={room.id}>
                  <RoomCard room={room} />
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
