import React from 'react';
import { FC, lazy } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const Home = lazy(() => import('@/views/home/index'));
const BasicLayout = lazy(() => import('@/layout/BasicLayout'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Home />
      }
    ]
  },
  // { path: '/', element: <Navigate to="/dashboard" /> },
  { path: '*', element: <span>404 NOT FOUND</span> }
];

export const RenderRouter = () => useRoutes(routes);

