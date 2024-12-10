import React, { useEffect } from "react";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Modal } from 'antd';
import { useAuth } from "../hooks/useAuth";

interface LoginPopupProps {
  onClose: () => void; // Function type
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
        onClose();
    }
}, [isAuthenticated, onClose]);


  return (
    <Modal
      open={true}
      footer={null}
      onCancel={onClose}
      destroyOnClose={true}
      centered
      width={'fit-content'}
    >
      <div style={{ width: 'fit-content', padding: '19px' }}>
        <Authenticator
          components={{
            SignIn: {
              Footer() {
                return null; // Customize footer if needed
              },
            },
          }}
        />
      </div>
    </Modal>
  );
};

export default LoginPopup;
