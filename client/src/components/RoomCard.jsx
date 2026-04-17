const RoomCard = ({ room }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="position-relative">
        <img
          src={room.imageUrl || 'https://via.placeholder.com/400x300?text=Room+Image'}
          className="card-img-top"
          alt={room.title}
          style={{ height: '240px', objectFit: 'cover' }}
        />
        <div className="price-tag shadow">₹{room.price}/mo</div>
      </div>
      <div className="card-body p-4 d-flex flex-column">
        <h5 className="card-title fw-bold text-dark mb-1">{room.title}</h5>
        <div className="text-muted small mb-3 d-flex align-items-center">
          <i className="bi bi-geo-alt-fill me-1 text-primary"></i>
          {room.location}
        </div>
        <p className="card-text text-secondary mb-4 flex-grow-1" style={{ fontSize: '0.95rem' }}>
          {room.description && room.description.length > 120
            ? `${room.description.substring(0, 120)}...`
            : room.description}
        </p>
        <button className="btn btn-outline-primary mt-auto w-100 py-2">
          View Property
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
