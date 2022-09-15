import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import './App.less';
import Slider from './components/Slider';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Router>
        <Slider collapsed={collapsed} />
        <Layout className="site-layout">
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Content />
          <Footer />
        </Layout>
      </Router>
    </Layout>
  );
};

export default App;
