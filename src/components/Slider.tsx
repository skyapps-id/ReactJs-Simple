import React, { FC } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

interface SliderProps {
  collapsed: boolean;
}

const { Sider } = Layout;

const Slider: FC<SliderProps> = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['2']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'Home'
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'Movie'
          }
        ]}
      />
    </Sider>
  );
};

export default Slider;
