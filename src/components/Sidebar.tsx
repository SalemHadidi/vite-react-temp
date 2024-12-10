import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  FileTextOutlined,
  SettingOutlined,
  DollarOutlined,
  MessageOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import LoginPopup from './LoginPopup'; // Import the LoginPopup

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { isAuthenticated, showLoginPopup, loginPopupVisible , hideLoginPopup} = useAuth(); // Include `hideLoginPopup` and `loginPopupVisible`
  const location = useLocation();

  const pathToKey: { [key: string]: string } = {
    '/': '1',
    '/plan': '2',
    '/documents': '4',
    '/chat': '5',
    '/settings': '6',
  };

  const selectedKey = pathToKey[location.pathname] || '1';

  useEffect(() => {
    if (location.pathname === '/chat') {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [location.pathname]);

  // Define menu items
  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: <a href="/">Home</a>,
    },
    {
      key: '2',
      icon: <DollarOutlined />,
      label: <a href="/plan">Pricing</a>,
    },
    !isAuthenticated
      ? {
          key: '3',
          icon: <LoginOutlined />,
          label: 'Login',
          onClick: showLoginPopup, // Trigger `showLoginPopup` when clicked
        }
      : [
          {
            key: '4',
            icon: <FileTextOutlined />,
            label: <a href="/documents">Documents</a>,
          },
          {
            key: '5',
            icon: <MessageOutlined />,
            label: <a href="/chat">Chat</a>,
          },
          {
            key: '6',
            icon: <SettingOutlined />,
            label: <a href="/settings">Settings</a>,
          },
        ],
  ].flat(); // Flatten to handle conditional nested arrays

  return (
    <>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} items={menuItems} />
      </Sider>

      {/* Conditionally render LoginPopup */}
      {loginPopupVisible && <LoginPopup onClose={hideLoginPopup} />}
    </>
  );
};

export default Sidebar;
