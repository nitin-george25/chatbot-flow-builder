"use client";
import { Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Node, useNodesState, useStore } from "reactflow";
import cloneDeep from "lodash/cloneDeep";
import { useChatbotFlowContext } from "@/context/ChatbotFlowContext";
import TextArea from "antd/es/input/TextArea";

interface SettingsPanelProps {
  node: Node;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ node }) => {
  const {setNodes} = useChatbotFlowContext();
  const [value, setValue] = useState<string>(node?.data?.message);

  useEffect(() => {
    const { data } = node ? node : { data: null };
    setValue(data?.message);
  }, [node])
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);

    if (setNodes === undefined) return;

    setNodes((prevNodes) => {
      const updatedNodes = cloneDeep(prevNodes);
      const nodeIndex = updatedNodes.findIndex((n) => n.id === node.id);
      prevNodes[nodeIndex].data = {
        ...prevNodes[nodeIndex].data,
        message: e.target.value,
      };
      return [...prevNodes];
    });
  }
  

  return (
    <div className="panel-container">
      <div className="panel-header border-b border-slate-300 h-10 px-4 flex items-center bg-slate-200">
        <h3 className="m-0 font-bold text-black">Settings Panel</h3>
      </div>
      <div className="settings-container flex flex-wrap p-4 gap-2">
        <label className="text-black">
          Message
        </label>
        <TextArea onChange={handleChange} value={value} key="message" rows={4} />
      </div>
    </div>
  );
};

export { SettingsPanel };
