import React from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import Menu from './Menu';
import '../stylesheet/backoffice.css';

const { Header, Content, Footer } = Layout;
const BackOfficeLayout = ({content}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor : 'white',
        }}
      >
        <Menu/>
      </Header>

      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
          {content}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export {BackOfficeLayout,Layout,Header,Content,Footer};