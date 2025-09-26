import { Box, Text, Flex } from "@chakra-ui/react";
import { Handle, Position } from "reactflow";
import "./ServiceNode.css";

interface ServiceNodeProps {
  data: {
    serviceName: string;
    type: string;
    ports: { port: number; targetPort?: number; nodePort?: number; name: string }[];
    selectors?: string[];
  };
}

export const ServiceNode: React.FC<ServiceNodeProps> = ({ data }) => {
  return (
    <Box className="service-node" style={{ width: '100%', height: '100%' }}>
      {/* Header */}
      <Flex className="service-header">
        <Text className="service-name">{data.serviceName}</Text>
        <Text className="service-type">{data.type}</Text>
      </Flex>

      <Box className="service-divider" />

      {/* Input & Output handles for ports */}
      {data.ports.map((port, index) => (
        <Flex key={index} className="service-port">
          {/* Input handle */}
          <Handle
            type="target"
            position={Position.Left}
            id={`port-${index}`}
            className="service-input-handle"
          />
          <Text className="service-port-text">{port.name}:{port.port}</Text>

          {/* Output handle */}
          <Handle
            type="source"
            position={Position.Right}
            id={`targetPort-${index}`}
            className="service-port-handle"
          />
          <Text className="service-port-text output">{port.targetPort ?? port.nodePort ?? "-"}</Text>
        </Flex>
      ))}
    </Box>
  );
};
