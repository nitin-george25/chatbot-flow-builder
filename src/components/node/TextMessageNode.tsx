import { useCallback } from "react";

import { MessageOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Handle, NodeProps, Position } from "reactflow";

import "./text-message-node.scss";

export interface TextMessageData {
  message: string;
}

const TextMessageNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="text-message-node">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <div className="card border border-slate-300 rounded-md shadow-lg w-60">
        <div
          className="
          card-header bg-teal-200 border-b border-slate-300 
          p-1 h-7 grid grid-cols-12 grid-flow-col items-center
          rounded-ss-md rounded-se-md"
        >
          <MessageOutlined className="text-xs" />
          <h3 className="text-xs font-black col-span-6">Send Message</h3>
          <div className="bg-white rounded-full h-5 w-5 justify-self-end flex items-center justify-center col-start-12">
            <WhatsAppOutlined className=" bg-green-600 rounded-full text-white" />
          </div>
        </div>
        <div className="card-body h-14 p-2">
          <p className="text-xs">{data.message}</p>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={true}
        
      />
    </div>
  );
};

export default TextMessageNode;
