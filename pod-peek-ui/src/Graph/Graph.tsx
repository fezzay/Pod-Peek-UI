import { useState, useEffect } from "react";
import ReactFlow, {
  type Node,
  type Edge,
  ReactFlowProvider,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { Box, Spinner, Text } from "@chakra-ui/react";
import "./Graph.css";
import { PodNode } from "./CustomNodes/PodNode";
import { ServiceNode } from "./CustomNodes/ServiceNode";
import { IngressNode } from "./CustomNodes/IngressNode";

const nodeTypes = {
  pod: PodNode,
  service: ServiceNode,
  ingress: IngressNode,
};

interface GraphProps {
  namespace: string; // <- new prop
}

export const Graph: React.FC<GraphProps> = ({ namespace }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://podpeek-api.local/Graph/${namespace}`); // use namespace dynamically
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        const data = await res.json();

        // Expecting { nodes: Node[], edges: Edge[] }
        setNodes(data.nodes);
        setEdges(data.edges);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, [namespace]); // refetch when namespace changes

  if (loading) {
    return (
      <Box
        className="graph-card"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        className="graph-card"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="red.500">Error: {error}</Text>
      </Box>
    );
  }

  return (
    <ReactFlowProvider>
      <Box className="graph-card">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={(changes) =>
            setNodes((nds) => applyNodeChanges(changes, nds))
          }
          nodesDraggable={true}
          fitView
          className="reactflow-wrapper"
        />
      </Box>
    </ReactFlowProvider>
  );
};
