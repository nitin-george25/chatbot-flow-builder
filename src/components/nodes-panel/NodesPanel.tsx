"use client";
import { Card } from "antd";
import React from "react";

const NodesPanel = () => {
  const onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    type: string
  ) => void = (event, type) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="panel-container">
      <div className="panel-header border-b border-slate-300 h-10 px-4 flex items-center bg-slate-200">
        <h3 className="m-0 font-bold">Nodes Panel</h3>
      </div>
      <div className="nodes-container flex flex-wrap p-4 gap-2">
        <Card
          className="dndnode input border border-blue-400"
          onDragStart={(event) => onDragStart(event, "text")}
          draggable
        >
          <p className="text-blue-400">Text Message</p>
        </Card>
      </div>
    </div>
  );
};

export { NodesPanel };
