import React from "react";
import { EdgeProps, getBezierPath, getMarkerEnd } from "reactflow";

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  data,
}) => {
  const edgePath = getBezierPath({ sourceX, sourceY, targetX, targetY }).join(
    ""
  );
  const markerEnd = getMarkerEnd(data.arrowHeadType || "default");

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <text>{/* Add any additional text or labels here */}</text>
    </>
  );
};

export default CustomEdge;
