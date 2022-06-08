import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu, Spin } from 'antd';
import React, { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
import './index';

const BasicLayout = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (location.pathname === '/') {
  //     navigate('/dashboard');
  //   }
  // }, [navigate, location]);

  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: <Link to={'/dashboard'}>dashboard</Link>
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: <Link to={'/component/table'}>component table</Link>
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: <Link to={'/component/form'}>component form</Link>
            }
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed)
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          <Suspense fallback={<Spin tip="加载中..."></Spin>}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;

