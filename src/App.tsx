// Import necessary libraries
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, FileTextOutlined, SettingOutlined, DollarOutlined, MessageOutlined } from '@ant-design/icons';
import HomePage from './pages/HomePage';
import DocumentsPage from './pages/DocumentsPage';
import ChatPage from './pages/ChatPage';
import PlanPage from './pages/PlanPage';
import SettingsPage from './pages/SettingsPage';
import LoginPopup from './components/LoginPopup';
import { useAuth } from './hooks/useAuth';

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { isAuthenticated, loginPopupVisible, showLoginPopup } = useAuth();

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        {/* Sidebar Navigation */}
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <a href="/">Home</a>
            </Menu.Item>
            <Menu.Item key="2" icon={<FileTextOutlined />}>
              <a href="/documents">Documents</a>
            </Menu.Item>
            <Menu.Item key="3" icon={<MessageOutlined />}>
              <a href="/chat">Chat</a>
            </Menu.Item>
            <Menu.Item key="4" icon={<DollarOutlined />}>
              <a href="/plan">Plan</a>
            </Menu.Item>
            <Menu.Item key="5" icon={<SettingOutlined />}>
              <a href="/settings">Settings</a>
            </Menu.Item>
          </Menu>
        </Sider>

        {/* Main Content */}
        <Layout>
          <Content style={{ margin: '16px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/documents"
                element={isAuthenticated ? <DocumentsPage /> : <Navigate to="/" />}
              />
              <Route
                path="/chat"
                element={isAuthenticated ? <ChatPage /> : <Navigate to="/" />}
              />
              <Route path="/plan" element={<PlanPage />} />
              <Route
                path="/settings"
                element={isAuthenticated ? <SettingsPage /> : <Navigate to="/" />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>

      {/* Login Popup */}
      {loginPopupVisible && <LoginPopup onClose={showLoginPopup} />}
    </Router>
  );
};

export default App;