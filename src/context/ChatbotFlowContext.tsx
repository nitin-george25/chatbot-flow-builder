import React, { createContext, useContext, useState, useCallback } from 'react';
import { ReactFlowInstance, useNodesState, useEdgesState, addEdge, Edge, getOutgoers, Node, OnConnect, NodeChange, OnNodesChange, OnEdgesChange } from 'reactflow';

interface ChatbotFlowContextProps {
  children: React.ReactNode;
}

export interface ChatbotFlowContextType {
  nodes?: Node<any, string | undefined>[];
  setNodes?: React.Dispatch<React.SetStateAction<Node<any, string | undefined>[]>>;
  onNodesChange?: OnNodesChange;
  edges?: Edge[];
  setEdges?: React.Dispatch<React.SetStateAction<Edge[]>>;
  onEdgesChange?: OnEdgesChange;
  reactFlowInstance?: ReactFlowInstance | null;
  setReactFlowInstance?: React.Dispatch<React.SetStateAction<ReactFlowInstance | null>>;
  onConnect?: OnConnect;
}

const ChatbotFlowContext = createContext<ChatbotFlowContextType>({
  nodes: [],
  setNodes: () => {},
  onNodesChange: () => {},
  edges: [],
  setEdges: () => {},
  onEdgesChange: () => {},
  reactFlowInstance: null,
  setReactFlowInstance: () => {},
  onConnect: () => {}
});

const initialNodes = [
  {
    id: "1",
    type: "text",
    data: { message: "Hey there!" },
    position: { x: 250, y: 5 },
  },
];

export const ChatbotFlowProvider: React.FC<ChatbotFlowContextProps> = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const onConnect = useCallback(
    ({source, target}: {source: string, target: string}) => {
      const sourceNode = nodes.find((node) => node.id === source);

      const outgoers = sourceNode ? getOutgoers(sourceNode, nodes, edges) : undefined;

      if ((outgoers && outgoers?.length > 0) || !sourceNode || source === target) {
        return;
      }

      setEdges((eds) => addEdge({source, target} as Edge, eds))
    },
    [nodes, edges, setEdges]
  );

  const connect = onConnect as OnConnect;

  return (
    <ChatbotFlowContext.Provider
      value={{
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
        reactFlowInstance,
        setReactFlowInstance,
        onConnect: connect
      }}
    >
      {children}
    </ChatbotFlowContext.Provider>
  );
};

export const useChatbotFlowContext = () => useContext<ChatbotFlowContextType>(ChatbotFlowContext);
