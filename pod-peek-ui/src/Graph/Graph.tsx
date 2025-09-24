import ReactFlow from "reactflow";
import type { Node, Edge } from 'reactflow';
import "reactflow/dist/style.css";
import { Box } from "@chakra-ui/react";
import "./Graph.css";
import { PodNode } from "./CustomNodes/PodNode";

const nodeTypes = { pod: PodNode };

// Example nodes
const nodes: Node[] = [
  {
    id: "pod-1",
    type: "pod", // matches nodeTypes key
    data: {
      podName: "nginx-pod",
      status: "Running",
      ports: [
        { name: "http", port: 80 },
        { name: "https", port: 443 },
      ],
      inputs: ["configmap", "service-a"],
    },
    position: { x: 100, y: 100 },
  },
  {
    id: "pod-2",
    type: "pod",
    data: {
      podName: "backend-pod",
      status: "Pending",
      ports: [{ name: "api", port: 3000 }],
      inputs: ["database"],
    },
    position: { x: 400, y: 200 },
  },
];

// Example edges (optional)
const edges: Edge[] = [
  {
    id: "e1-2",
    source: "pod-1",
    target: "pod-2",
    sourceHandle: "port-0", // link to the first output port
    targetHandle: "input-1", // link to the second input
  },
];

export const Graph = () => {
  return (
    <Box className="graph-card">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        className="reactflow-wrapper"
      />
    </Box>
  );
};
