import React from "react";
import { Menu } from "antd";
import { AppstoreOutlined, NodeIndexOutlined } from "@ant-design/icons";

interface MenuItem {
  label: string;
  key: string;
  title: string;
  path: string;
  icon: JSX.Element;
  disabled?: boolean;
}

const navLinks: MenuItem[] = [
  {
    key: "d01",
    label: "Dashboard",
    title: "Dashboard",
    path: "/dashboard",
    disabled: true,
    icon: <AppstoreOutlined />,
  },
  {
    key: "d02",
    label: "Chatbot Flow Builder",
    title: "Chatbot Flow Builder",
    path: "/dashboard/chatbot-flow-builder",
    icon: <NodeIndexOutlined />,
  },
];

const Navbar: React.FC = () => {

  return (
    <div className="nav-container h-screen bg-white relative">
      <div className="flex items-center justify-center bg-white h-16">
        <h1 className=" text-blue-950 text-lg font-bold">Chatbot Dashboard</h1>
      </div>
      <Menu
        title="Chatbot Dashboard"
        theme="light"
        mode="inline"
        selectedKeys={["d02"]}
        items={navLinks}
      ></Menu>
    </div>
  );
};

export default Navbar;
