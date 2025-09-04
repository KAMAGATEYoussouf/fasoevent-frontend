import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CommonLayout from '../layouts/common';
import { publicRoutes } from './allRoutes';

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<CommonLayout />}>
        {publicRoutes.map((route, index) => {
          const ElementPage = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <React.Suspense fallback={<div>Chargement...</div>}>
                  <ElementPage />
                </React.Suspense>
              }
            />
          );
        })}
      </Route>
      <Route path="*" element={<div>Page non trouvée</div>} />
    </Routes>
  );
};

export default MainRoutes;