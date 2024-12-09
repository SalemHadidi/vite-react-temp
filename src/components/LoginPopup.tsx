// LoginPopup.tsx
import React, { useState } from 'react';
import { Modal, Tabs, Form, Input, Button, message } from 'antd';
// import './LoginPopup.css'; // Optional: Add custom styling

const { TabPane } = Tabs;

interface LoginPopupProps {
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (values: { email: string; password: string }) => {
    setLoading(true);
    console.log('Login data:', values);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success('Login successful');
      onClose();
    }, 1500);
  };

  const handleSignup = (values: { email: string; password: string; confirmPassword: string }) => {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match');
      return;
    }
    setLoading(true);
    console.log('Signup data:', values);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success('Signup successful');
      onClose();
    }, 1500);
  };

  return (
    <Modal
      title="Welcome to AI PDF Assistant"
      visible={true}
      onCancel={onClose}
      footer={null}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Login" key="1">
          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane tab="Sign Up" key="2">
          <Form layout="vertical" onFinish={handleSignup}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[{ required: true, message: 'Please confirm your password' }]}
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default LoginPopup;
