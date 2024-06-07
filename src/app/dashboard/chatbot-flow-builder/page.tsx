"use client";
import React, { useCallback, useState } from "react";

import { Edge,  Node, useEdges, useNodes, useNodesState, useOnSelectionChange } from "reactflow";

import ChatbotFlow from "@/components/flow/ChatbotFlow";
import { Button, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { message } from "antd";

import { NodesPanel } from "@/components/nodes-panel/NodesPanel";
import { SettingsPanel } from "@/components/settings-panel/SettingsPanel";
import { ChatbotFlowProvider, useChatbotFlowContext } from "@/context/ChatbotFlowContext";

interface ChatbotFlowBuilderPageProps {}

const ChatbotFlowBuilderPage: React.FC<ChatbotFlowBuilderPageProps> = (): React.ReactNode => {
  const [selectedNode, setSelectedNode] = useState<Node>();
  const [messageApi, contextHolder] = message.useMessage();

  const nodes = useNodes();
  const edges = useEdges();
 
    const onChange = useCallback(({nodes, edges}: {nodes: Node[], edges: Edge[]}) => {
      const selectedNode = nodes[nodes.length - 1];
      setSelectedNode(selectedNode);
    }, []);

  useOnSelectionChange({
    onChange
  });

  const handleSave = () => {
    if (!nodes || !edges) {
      messageApi.info("Nothing to save");
      return;
    }

    if (edges.length < nodes.length - 1) {
      messageApi.error("Cannot save Flow");
      return;
    }
  }

  return (
    <>
      <ChatbotFlowProvider>
        {contextHolder}
        <Header
          className="site-layout-background bg-white border-b border-slate-300 h-16 w-full grid"
          style={{ padding: 0 }}
        >
          <div className=" justify-self-end w-80 flex justify-center">
            <Button type="default" className="m-4" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </Header>
        <Layout>
          <Content className="bg-white p-4 border-r border-slate-300">
            <ChatbotFlow />
          </Content>
          <Sider width={318} style={{ backgroundColor: "#fff" }}>
            {selectedNode ? <SettingsPanel node={selectedNode} /> : <NodesPanel />}
          </Sider>
        </Layout>
      </ChatbotFlowProvider>
    </>
  );
};

export default ChatbotFlowBuilderPage;
