import React from 'react';
import { FC, lazy } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const Home = lazy(() => import('@/views/home/index'));
const BasicLayout = lazy(() => import('@/layout/BasicLayout'));
const BlankLayout = lazy(() => import('@/layout/BlankLayout'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" />
      },
      {
        path: '/dashboard',
        element: <Home />
      },
      {
        path: 'component',
        element: <BlankLayout />,
        children: [
          {
            path: '',
            element: <Navigate to="form" />
          },
          {
            path: 'form',
            element: <h1 className="text-3xl font-bold underline">Hello world!</h1>
          },
          {
            path: 'table',
            element: <div>我是 table</div>
          }
        ]
      }
    ]
  },
  // { path: '/', element: <Navigate to="/dashboard" /> },
  { path: '*', element: <span>404 NOT FOUND</span> }
];

export const RenderRouter = () => useRoutes(routes);

