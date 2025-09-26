import React, { useState } from "react";
import ReactFlow, {
  type Node,
  type Edge,
  ReactFlowProvider,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { Box } from "@chakra-ui/react";
import "./Graph.css";
import { PodNode } from "./CustomNodes/PodNode";
import { ServiceNode } from "./CustomNodes/ServiceNode";
import { IngressNode } from "./CustomNodes/IngressNode";

// import the JSON
import graphData from "./graphData.json";

const nodeTypes = {
  pod: PodNode,
  service: ServiceNode,
  ingress: IngressNode,
};

export const Graph = () => {
  const [nodes, setNodes] = useState<Node[]>(graphData.nodes);
  const [edges, setEdges] = useState<Edge[]>(graphData.edges);

  return (
    <ReactFlowProvider>
      <Box className="graph-card">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={(changes) => setNodes((nds) => applyNodeChanges(changes, nds))}
          nodesDraggable={true}         // ensure dragging is enabled
          fitView
          className="reactflow-wrapper"
        />
      </Box>
    </ReactFlowProvider>
  );
};
