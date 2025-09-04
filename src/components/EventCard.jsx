import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-image">{event.image}</div>
      <div className="event-content">
        <div className="event-title">{event.title}</div>
        <div className="event-date">{event.date}</div>
        <div className="event-city">:round_pushpin: {event.city}</div>
        <div className="event-price">{event.price}</div>
        <a href={event.link} className="btn">Voir détails</a>
      </div>
    </div>
  );
};

export default EventCard;