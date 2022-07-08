import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import routes from '../routes';
const { Content } = Layout;

const ContentComponent: FC = () => {
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280
      }}
    >
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Routes>
    </Content>
  );
};

export default ContentComponent;
