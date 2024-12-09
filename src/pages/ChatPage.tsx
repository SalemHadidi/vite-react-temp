// ChatPage.tsx
import React, { useState } from 'react';
import { Layout, Input, Button, Tabs, Typography, Spin } from 'antd';
import { FileTextOutlined, SnippetsOutlined } from '@ant-design/icons';
// import './ChatPage.css'; // Optional: Add custom styling

const { TextArea } = Input;
const { Title } = Typography;

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [activeTab, setActiveTab] = useState('file');

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      sender: 'user',
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    // Simulate AI response (replace this with an API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: `${Date.now()}-ai`,
        sender: 'ai',
        content: `AI response to: ${userMessage.content}`,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsThinking(false);
    }, 2000);
  };

  const renderMessages = () => (
    <div className="chatroom-messages">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
        >
          {message.content}
        </div>
      ))}
    </div>
  );

  return (
    <Layout className="chat-page">
      <Layout.Sider width={300} className="chat-sidebar">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'file',
              label: (
                <span>
                  <FileTextOutlined /> File
                </span>
              ),
              children: <div className="file-preview">PDF Viewer Placeholder</div>,
            },
            {
              key: 'summary',
              label: (
                <span>
                  <SnippetsOutlined /> Summary
                </span>
              ),
              children: <div className="summary-options">Summary Options Placeholder</div>,
            },
          ]}
        />
      </Layout.Sider>

      <Layout.Content className="chat-content">
        <Title level={3}>Chat with AI</Title>
        {renderMessages()}
        {isThinking && (
          <div className="thinking-indicator">
            <Spin /> Thinking...
          </div>
        )}

        <div className="chat-input">
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            rows={3}
          />
          <Button type="primary" onClick={handleSendMessage}>
            Send
          </Button>
          <Button danger onClick={() => setMessages([])}>
            Clear Chat
          </Button>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default ChatPage;