import ReactFlow from "reactflow";
import type { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { Box } from "@chakra-ui/react";
import "./Graph.css";
import { PodNode } from "./CustomNodes/PodNode";
import { ServiceNode } from "./CustomNodes/ServiceNode"; // new node

// import the JSON
import graphData from "./graphData.json";

const nodeTypes = {
  pod: PodNode,
  service: ServiceNode
};

export const Graph = () => {
  const nodes: Node[] = graphData.nodes;
  const edges: Edge[] = graphData.edges;

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
