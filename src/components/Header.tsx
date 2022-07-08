import React, { FC } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

interface HeaderProps {
  setCollapsed: (data: boolean) => void;
  collapsed: boolean;
}

const { Header } = Layout;

const HeaderComponent: FC<HeaderProps> = ({ setCollapsed, collapsed }) => {
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed)
      })}
    </Header>
  );
};

export default HeaderComponent;
