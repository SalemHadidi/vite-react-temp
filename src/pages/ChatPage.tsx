import { Splitter } from "antd";
import PDFViewer from "../components/PDFViewer";
import Chatroom from "../components/ChatRoom";

const Demo = () => {
  const pdfUrl = "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf";

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Splitter style={{ flex: 1}}>
        <Splitter.Panel defaultSize="50%" min="20%" max="70%" >
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