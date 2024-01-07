import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  // createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import ProtectedRoute from './app/components/pages/admin/hoc/protectedRoute';
import AuthProvider from './app/hooks/useAuth';
import ProductProvider from './app/hooks/useProduct';


import App from './App';
import Corusel from './app/components/corusel';
import About from './app/components/aboutPage';
import CatalogPage from './app/components/pages/catalogPage';
import PromotionPage from './app/components/pages/promotionPage';
import AdminPage from './app/components/pages/admin/mainAdminPage';
import LoginForm from './app/components/pages/loginForm';
import LogOut from './app/components/logout';
import NetworkError from './app/components/pages/networkError';
import ImageProvider from './app/hooks/useImage';


const router = createHashRouter(
// const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={
      <ImageProvider>
        <AuthProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </AuthProvider>
      </ImageProvider>
    }>
      <Route path='home' element={<Corusel />} />
      <Route path='catalog/:productPage?/:id?' element={<CatalogPage />} />
      <Route path='about' element={<About />} />
      <Route path='promotion' element={<PromotionPage />} />
      <Route path='login' element={<LoginForm />} />
      <Route path='logout' element={<LogOut />} />
      <Route path='/networkError' element={<NetworkError />} />
      <Route element={<ProtectedRoute />}>
        <Route path='admin/:product?/:prodId?/:edit?/:createProduct?' element={<AdminPage />} />
      </Route>
      <Route path="" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Route>
  )
);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


