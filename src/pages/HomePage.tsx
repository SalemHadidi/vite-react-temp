// HomePage.tsx
import React from 'react';
import { Upload, Button, Typography, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import './HomePage.css'; // Optional: Add custom styling

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const handleUpload = (file: File) => {
    // Handle file upload logic here
    console.log('Uploaded file:', file);
  };

  return (
    <div className="home-page">
      <Row justify="center" align="middle" style={{ minHeight: '100%', textAlign: 'center' }}>
        <Col span={24}>
          <Title>Welcome to AI-Powered PDF Assistant</Title>
          <Paragraph>
            Upload your PDF files and start asking questions or generating summaries with AI.
          </Paragraph>

          <Upload
            accept=".pdf"
            beforeUpload={(file) => {
              handleUpload(file);
              return false; // Prevent default upload behavior
            }}
          >
            <Button type="primary" icon={<UploadOutlined />}>Upload PDF</Button>
          </Upload>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
