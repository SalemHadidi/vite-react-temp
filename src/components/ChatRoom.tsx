import React, { useState, useEffect, useRef } from 'react';
import { Layout, List, Input, Button, Spin, Avatar, Card } from 'antd';
import axios from 'axios';
import './ChatRoom.css'; // Import the CSS file

const { Header, Content, Footer } = Layout;

// Define the structure of a message
interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const ChatRoom: React.FC = () => {
  const api_endpoint: string = 'https://2k7cm2ihk1.execute-api.us-east-1.amazonaws.com/chat'
  const [messages, setMessages] = useState<Message[]>([]); // Store chat messages
  const [inputValue, setInputValue] = useState<string>(''); // Store user input
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false); // Show bot typing indicator
  const messageListRef = useRef<HTMLDivElement>(null); // Ref for scrolling to the latest message

  // Automatically scroll to the bottom when messages change
  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return; // Prevent sending empty messages

    // Add the user's message to the chat
    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]); // Update state with user's message
    setInputValue(''); // Clear the input field

    // Send the user's message to the server and get the bot's response
    try {
        setIsBotTyping(true); // Show typing indicator
      
        // Send a POST request to the API
        const response = await axios.post(api_endpoint, {
          chatroomId: 'chatroom1',
          message: userMessage.text,
        });
      
        // Add the bot's response to the chat
        const botMessage: Message = {
          id: Date.now() + 1,
          sender: 'bot',
          text: response.data.response,
          timestamp: new Date().toISOString(),
        };
      
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        // Show an error message if the API call fails
        const errorMessage: Message = {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Something went wrong. Please try again.',
          timestamp: new Date().toISOString(),
        };
      
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsBotTyping(false); // Hide typing indicator
      }
      
  };

  return (
    <Layout className="chatroom-layout">
      {/* Chatroom header */}
      <Header className="chatroom-header">Ask Here</Header>

      {/* Main content with messages */}
      <Content className="chatroom-content">
        <Card className="chatroom-messages" ref={messageListRef}>
          <List
            dataSource={messages} // Pass messages to the List
            renderItem={(message) => (
              <List.Item
                className={`chatroom-message ${
                  message.sender === 'user' ? 'user-message' : 'bot-message'
                }`}
              >
                {/* Message avatar and text */}
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        message.sender === 'bot'
                          ? 'https://via.placeholder.com/50x50?text=Bot'
                          : 'https://via.placeholder.com/50x50?text=You'
                      }
                    />
                  }
                  description={message.text}
                />
              </List.Item>
            )}
          />
          {/* Bot typing indicator */}
          {isBotTyping && <Spin className="chatroom-typing" tip="Bot is typing..." />}
        </Card>
      </Content>

      {/* Footer with input and send button */}
      <Footer className="chatroom-footer">
        <Button
          type="primary"
          className="chatroom-send-button"
          onClick={handleSendMessage} // Send the message on click
        >
          Send
        </Button>
        <Input
          className="chatroom-input"
          placeholder="Type your question here..."
          value={inputValue} // Controlled input value
          onChange={(e) => setInputValue(e.target.value)} // Update input value
          onPressEnter={handleSendMessage} // Send the message on Enter key
        />
      </Footer>
    </Layout>
  );
};

export default ChatRoom;
