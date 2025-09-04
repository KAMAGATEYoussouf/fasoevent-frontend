import React from 'react';

const HomePage = React.lazy(() => import('../pages/common/home'));

// Routes publiques (simplifiées)
const publicRoutes = [
  {
    path: '/',
    component: HomePage,
  },
  // Ajoute d'autres routes plus tard si besoin, comme /about, /login
];

export { publicRoutes };