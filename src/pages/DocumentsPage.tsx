// DocumentsPage.tsx
import React from 'react';
import { Table, Button, Typography, Row, Col } from 'antd';
import { FolderAddOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
// import './DocumentsPage.css'; // Optional: Add custom styling

const { Title } = Typography;

interface Document {
  key: string;
  name: string;
  uploadDate: string;
  size: string;
}

const DocumentsPage: React.FC = () => {
  const documents: Document[] = [
    {
      key: '1',
      name: 'Sample Document.pdf',
      uploadDate: '2024-12-07',
      size: '1.2 MB',
    },
    // Add more document objects as needed
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a href="#">{text}</a>,
    },
    {
      title: 'Upload Date',
      dataIndex: 'uploadDate',
      key: 'uploadDate',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <>
          <Button type="link" icon={<FileTextOutlined />}>View</Button>
          <Button type="link" danger icon={<DeleteOutlined />}>Delete</Button>
        </>
      ),
    },
  ];

  const handleAddFolder = () => {
    // Logic to add a new folder
    console.log('Add folder clicked');
  };

  return (
    <div className="documents-page">
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={2}>Your Documents</Title>
        </Col>
        <Col>
          <Button type="primary" icon={<FolderAddOutlined />} onClick={handleAddFolder}>
            Add Folder
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={documents} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default DocumentsPage;
