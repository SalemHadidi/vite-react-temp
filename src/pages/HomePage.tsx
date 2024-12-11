// HomePage.tsx
import React from 'react';
import { Upload, Typography, Row, Col ,message, UploadProps} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

// import './HomePage.css'; // Optional: Add custom styling

const { Title, Paragraph } = Typography;
const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: false,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Row justify="center" align="middle" style={{ minHeight: '100%', textAlign: 'center' }}>
        <Col span={24}>
          <Title>Welcome to AI-Powered PDF Assistant</Title>
          <Paragraph>
            Upload your PDF files and start asking questions or generating summaries with AI.
          </Paragraph>

          <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
