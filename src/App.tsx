import React, { useState } from 'react';
// import { BrowserRouter as Router} from 'react-router-dom';
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
      <Slider collapsed={collapsed} />
      <Layout className="site-layout">
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Content />
        <Footer />
      </Layout>
    </Layout>
  );
};

export default App;
