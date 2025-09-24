import { Box, Text, Flex } from "@chakra-ui/react";
import { Handle, Position } from "reactflow";
import "./PodNode.css";

interface PodNodeProps {
  data: {
    podName: string;
    status: string;
    ports: { name: string; port: number }[];
    inputs?: string[];
  };
}

export const PodNode: React.FC<PodNodeProps> = ({ data }) => {
  return (
    <Box className="pod-node">
      {/* Pod Header */}
      <Flex className="pod-header">
        <Text className="pod-name">{data.podName}</Text>
        <Text
          className="pod-status"
          color={data.status === "Running" ? "green.500": "red.500"}
        >
          {data.status}
        </Text>
      </Flex>

      <Box className="pod-divider" />

      {/* Inputs */}
      {data.inputs && data.inputs.length > 0 && (
        <Box>
          {data.inputs.map((input, index) => (
            <Flex key={index} className="pod-input">
              <Handle
                type="target"
                position={Position.Left}
                id={`input-${index}`}
                className="pod-input-handle"
              />
              <Text className="pod-input-text">
                {input}
              </Text>
            </Flex>
          ))}
        </Box>
      )}

      {/* Ports */}
      {data.ports.map((port, index) => (
        <Flex key={index} className="pod-port" justify="flex-end">
          <Text className="pod-port-text">
            {port.name}:{port.port}
          </Text>
          <Handle
            type="source"
            position={Position.Right}
            id={`port-${index}`}
            className="pod-port-handle"
          />
        </Flex>
      ))}
    </Box>
  );
};
