import React from 'react';
import EventCard from '../../../components/EventCard';  // Ton composant existant pour les cartes

const HomePage = () => {
  // Données statiques pour tester (inspiré du template HTML)
  const events = [
    {
      title: 'Festival de Musique Traditionnelle',
      date: 'Du 15/09/2024 au 17/09/2024',
      city: 'Ouagadougou',
      price: '5 000 FCFA',
      image: ':date: Festival de Musique Traditionnelle',  // Placeholder emoji comme dans le template
      link: '/event-detail-1',
    },
    {
      title: 'Conférence Tech Innovation',
      date: 'Du 20/09/2024 au 20/09/2024',
      city: 'Bobo-Dioulasso',
      price: '2 000 FCFA',
      image: ':date: Conférence Tech Innovation',
      link: '/event-detail-2',
    },
    {
      title: 'Exposition d\'Art Contemporain',
      date: 'Du 01/10/2024 au 15/10/2024',
      city: 'Koudougou',
      price: '1 000 FCFA',
      image: ':date: Exposition d\'Art Contemporain',
      link: '/event-detail-3',
    },
  ];

  return (
    <div id="home" className="page active">
      <div className="hero">
        <div className="container">
          <h1>Découvrez les Événements du Burkina Faso</h1>
          <p>Trouvez et réservez les meilleurs événements dans votre ville</p>
        </div>
      </div>

      <div className="container">
        <h2>Événements à venir</h2>
        <div className="events-grid" id="events-grid">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />  // Utilise ton EventCard existant, passe les props
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;