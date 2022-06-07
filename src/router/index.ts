// import React, { lazy, ReactNode, Suspense } from 'react';
// import { RouteObject } from 'react-router-dom';

// const Home = lazy(() => import('../views/home'));
// const User = lazy(() => import('../views/user'));
// const Version = lazy(() => import('../views/version'));

// import AppLayout from '../AppLayout';

// // 实现懒加载的用Suspense包裹 定义函数
// // const lazyLoad = (children: ReactNode): ReactNode => {
// //   return <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>;
// // };

// export const routers: RouteObject[] = [
//   {
//     path: '/',
//     element: <AppLayout />,
//     //路由嵌套，子路由的元素需使用<Outlet />
//     children: [
//       {
//         index: true,
//         element: Home
//       },
//       {
//         path: '/user/list',
//         element: lazyLoad(<User />)
//       },
//       {
//         path: '/user/detail/:id',
//         element: lazyLoad(<Detail />)
//       }
//     ]
//   },
//   {
//     path: '/login',
//     element: lazyLoad(<Login />)
//   }
// ];

