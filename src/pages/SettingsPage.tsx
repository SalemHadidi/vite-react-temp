// SettingsPage.tsx
import React, { useState } from 'react';
import { Form, Input, Button, Typography, Row, Col, Modal, message } from 'antd';
// import './SettingsPage.css'; // Optional: Add custom styling

const { Title } = Typography;

const SettingsPage: React.FC = () => {
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isDeletingFiles, setIsDeletingFiles] = useState(false);

  const handleEmailUpdate = (values: { email: string }) => {
    console.log('Updated email:', values.email);
    message.success('Email updated successfully');
  };

  const handleDeleteAccount = () => {
    setIsDeletingAccount(false);
    message.success('Account deleted successfully');
    // Redirect or logout logic here
  };

  const handleDeleteFiles = () => {
    setIsDeletingFiles(false);
    message.success('All files deleted successfully');
  };

  return (
    <div className="settings-page">
      <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Settings
      </Title>

      <Row justify="center">
        <Col xs={24} sm={16} md={12}>
          <Form layout="vertical" onFinish={handleEmailUpdate}>
            <Form.Item
              label="Update Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
            >
              <Input placeholder="Enter your new email" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Email
              </Button>
            </Form.Item>
          </Form>

          <Button
            danger
            style={{ marginTop: '16px', width: '100%' }}
            onClick={() => setIsDeletingFiles(true)}
          >
            Delete All Files
          </Button>

          <Button
            danger
            style={{ marginTop: '16px', width: '100%' }}
            onClick={() => setIsDeletingAccount(true)}
          >
            Delete Account
          </Button>
        </Col>
      </Row>

      <Modal
        title="Confirm Delete All Files"
        visible={isDeletingFiles}
        onOk={handleDeleteFiles}
        onCancel={() => setIsDeletingFiles(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete all your files? This action cannot be undone.</p>
      </Modal>

      <Modal
        title="Confirm Account Deletion"
        visible={isDeletingAccount}
        onOk={handleDeleteAccount}
        onCancel={() => setIsDeletingAccount(false)}
        okText="Delete Account"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default SettingsPage;