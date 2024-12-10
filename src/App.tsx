import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import HomePage from './pages/HomePage';
import DocumentsPage from './pages/DocumentsPage';
import ChatPage from './pages/ChatPage';
import PlanPage from './pages/PlanPage';
import SettingsPage from './pages/SettingsPage';
import LoginPopup from './components/LoginPopup';
import { useAuth } from './hooks/useAuth';
import Sidebar from './components/Sidebar'

const { Content } = Layout;

const App: React.FC = () => {
  const { isAuthenticated, loginPopupVisible, showLoginPopup, hideLoginPopup} = useAuth(); 

  useEffect(() => {
    if (isAuthenticated){
      hideLoginPopup();
    }
  }, [isAuthenticated, hideLoginPopup]);

  
  const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
    if (isAuthenticated) {
      return <>{element}</>;
    } else {
      showLoginPopup();
      return null; // Prevent rendering the page
    }
  };

  return (
    <Router>
      <Layout style={{ height: '100vh' }}>
        <Sidebar />

        {/* Main Content */}
        <Layout style={{ overflow: 'hidden' }}>
          <Content
            style={{
              margin: '16px',
              padding: '16px',
              background: '#fff',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/documents"
                element={<ProtectedRoute element={<DocumentsPage />} />}
              />
              <Route
                path="/chat"
                element={<ProtectedRoute element={<ChatPage />} />}
              />
              <Route path="/plan" element={<PlanPage />} />
              <Route
                path="/settings"
                element={<ProtectedRoute element={<SettingsPage />} />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>

      {/* Login Popup */}
      {!isAuthenticated && loginPopupVisible && <LoginPopup onClose={hideLoginPopup}/>}
    </Router>
  );
};

export default App;