"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";

import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Edge,
  ReactFlowInstance,
  OnConnect,
  getOutgoers,
  Node,
} from "reactflow";

import TextMessageNode from "../node/TextMessageNode";

import "reactflow/dist/style.css";
import { ChatbotFlowContextType, useChatbotFlowContext } from "@/context/ChatbotFlowContext";

interface ChatbotFlowProps {
}

const nodeTypes = {
  text: TextMessageNode,
};

let id = 2;
const getId = () => `cbnode_${id++}`;

const ChatbotFlow: React.FC<ChatbotFlowProps> = () => {
  const reactFlowWrapper = useRef(null);

  const {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    onEdgesChange,
    reactFlowInstance,
    setReactFlowInstance,
    onConnect,
  }: ChatbotFlowContextType = useChatbotFlowContext();

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type || reactFlowInstance === null) {
        return;
      }

      const position = (
        reactFlowInstance as ReactFlowInstance
      ).screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: {
          message:
            "Click on this node and change this message in Settings Panel",
        },
      };

      if (setNodes) {
        setNodes((nds) => (nds ? nds.concat(newNode) : [newNode]));
      }
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow h-full w-full">
        <div className="reactflow-wrapper h-full w-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect as OnConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            zoomOnPinch={true}
          >
            <Controls />
          </ReactFlow>
        </div>
    </div>
  );
};

export default ChatbotFlow;
