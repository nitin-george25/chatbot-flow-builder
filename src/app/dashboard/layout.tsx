"use client";
import React, { useState } from "react";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";

import Navbar from "../../components/navbar/Navbar";
import { ReactFlowProvider } from "reactflow";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ReactFlowProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider className=" border-r border-slate-300" width={250} trigger={null}>
          <Navbar />
        </Sider>
        <Layout className="min-h-full">{children}</Layout>
      </Layout>
    </ReactFlowProvider>
  );
};

export default DashboardLayout;
