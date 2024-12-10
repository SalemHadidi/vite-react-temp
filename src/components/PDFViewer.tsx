import * as React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import type {
  ToolbarSlot,
  TransformToolbarSlot,
} from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

interface PDFViewerProps {
  fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    EnterFullScreen: () => <></>,
    EnterFullScreenMenuItem: () => <></>,
    SwitchTheme: () => <></>,
    SwitchThemeMenuItem: () => <></>,
    Open: () => <></>,
    OpenMenuItem: () => <></>,
    ShowProperties: () => <></>,
    ShowPropertiesMenuItem: () => <></>
  });

  return (
    <Worker workerUrl="/pdf.worker.min.js">
      <div className="rpv-core__viewer">
        <div className="toolbar-container">
          <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
        </div>
        <div className="viewer-container">
          <Viewer fileUrl={fileUrl} plugins={[toolbarPluginInstance]} />
        </div>
      </div>
    </Worker>
  );
};

export default PDFViewer;
