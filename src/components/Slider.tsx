import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import routes from '../routes';
interface SliderProps {
  collapsed: boolean;
}

const { Sider } = Layout;
const pathName = window.location.pathname;
const defaultSelected = routes.findIndex(({ path }) => path == pathName) + 1;

const Slider: FC<SliderProps> = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      {/* <div className="logo"></div> */}
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[String(defaultSelected)]}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: <Link to={'/'}>Home</Link>
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: <Link to={'/movie'}>Movie</Link>
          }
        ]}
      />
    </Sider>
  );
};

export default Slider;
