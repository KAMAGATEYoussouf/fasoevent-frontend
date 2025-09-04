import React from 'react';

const Header = () => {
  return (
    <header>
      <nav className="container">
        <div className="logo">:tada: EventsBF</div>
        <ul className="nav-links" id="nav-links">
          <li><a href="/" className="active">Accueil</a></li>
          <li><a href="/about">À propos</a></li>
          <li><a href="/login" id="auth-link">Connexion</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;