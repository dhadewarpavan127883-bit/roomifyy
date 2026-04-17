import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import RoomCard from '../components/RoomCard';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const { user, token } = useContext(AuthContext);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRoom, setNewRoom] = useState({ title: '', description: '', price: '', location: '', imageUrl: '' });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get('/api/rooms');
      setRooms(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/rooms', newRoom);
      setRooms([...rooms, res.data]);
      setShowAddForm(false);
      setNewRoom({ title: '', description: '', price: '', location: '', imageUrl: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-5">
      <div className="pb-4 mb-5 border-bottom d-flex justify-content-between align-items-center">
        <div>
          <h1 className="fw-bold text-dark mb-1">Available Properties</h1>
          <p className="text-muted mb-0">Discover the best places to live around the world.</p>
        </div>
        {user && (
          <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
            <i className={`bi ${showAddForm ? 'bi-x-lg' : 'bi-plus-lg'} me-2`}></i>
            {showAddForm ? 'Cancel' : 'List a Property'}
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="card shadow border-0 mb-5 p-4 bg-white" style={{ borderRadius: '24px' }}>
          <h3 className="fw-bold mb-4">List Your Property</h3>
          <form onSubmit={handleAddSubmit}>
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Property Title</label>
                <input type="text" className="form-control" value={newRoom.title} onChange={e => setNewRoom({...newRoom, title: e.target.value})} required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Location</label>
                <input type="text" className="form-control" value={newRoom.location} onChange={e => setNewRoom({...newRoom, location: e.target.value})} required />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Price (₹ per mo)</label>
                <input type="number" className="form-control" value={newRoom.price} onChange={e => setNewRoom({...newRoom, price: e.target.value})} required />
              </div>
              <div className="col-md-8">
                <label className="form-label fw-semibold">Image URL (Optional)</label>
                <input type="text" className="form-control" value={newRoom.imageUrl} onChange={e => setNewRoom({...newRoom, imageUrl: e.target.value})} />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Description</label>
                <textarea className="form-control" rows="4" value={newRoom.description} onChange={e => setNewRoom({...newRoom, description: e.target.value})} required></textarea>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary px-5 py-3">Publish Property</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {rooms.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-4">No apartments available right now.</p>
        </div>
      ) : (
        <div className="row g-4 justify-content-center">
          {rooms.map(room => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={room.id}>
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomList;
