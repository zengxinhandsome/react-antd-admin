import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const BlankLayout = () => {
  return (
    <>
      BlankLayout
      <Suspense fallback={<Spin tip="加载中..."></Spin>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default BlankLayout;

