import {useState} from 'react'
import { Splitter, Radio } from "antd";
import type {RadioChangeEvent} from 'antd';
import PDFViewer from "../components/PDFViewer";
import Chatroom from "../components/ChatRoom";

const Demo = () => {
  const pdfUrl = "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf";
  const [size, setSize] = useState<string>('medium');
  const [source, setSource] = useState<string>('file');
  
  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  const handleSourceChange = (e: RadioChangeEvent) => {
    setSource(e.target.value);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Splitter style={{ flex: 1}}>
        <Splitter.Panel defaultSize="50%" min="20%" max="70%" >
        <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center'
            }}>
            <Radio.Group value={source} onChange={handleSourceChange}>
              <Radio.Button value="file">Original File</Radio.Button>
              <Radio.Button value="summary">Summary</Radio.Button>
            </Radio.Group>
          </div>
          {(source == 'summary') && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center'
            }}>
            <Radio.Group value={size} onChange={handleSizeChange}>
              <Radio.Button value="short">Short</Radio.Button>
              <Radio.Button value="middle">Default</Radio.Button>
              <Radio.Button value="long">Long</Radio.Button>
            </Radio.Group>
          </div>
            )}
          <PDFViewer fileUrl={pdfUrl} />
        </Splitter.Panel>
        <Splitter.Panel defaultSize="50%" min="20%" max="70%" >
          <Chatroom />
        </Splitter.Panel>
      </Splitter>
    </div>
  );
};

export default Demo;