import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LandingPage from './frontend/pages/LandingPage.tsx';
import UpdateProduct from './frontend/pages/UpdateProduct.tsx';
import AddProduct from './frontend/pages/AddProduct.tsx';
import ReccomendList from './frontend/pages/ReccomendList.tsx';
import API_AllProduct from './api/API_ProductList.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/AllProduct',
    element: <API_AllProduct />
  },
  {
    path: '/UpdateProduct/:id',
    element: <UpdateProduct />
  },
  {
    path: '/AddProduct',
    element: <AddProduct />
  },
  {
    path: 'ReccomendList',
    element: <ReccomendList />
  }
])

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
}
