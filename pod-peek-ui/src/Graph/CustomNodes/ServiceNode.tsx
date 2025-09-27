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
    <Box className="service-node">
      {/* Node Header */}
      <Flex className="service-header">
        <Text className="service-name">{data.serviceName}</Text>
        <Text className="service-type">{data.type}</Text>
      </Flex>

      <Box className="service-divider" />

      {/* Port Sections */}
      {data.ports.map((port, index) => (
        <Box key={`port-section-${index}`} className="service-port-section">

          {/* Port Title */}
          <Text className="service-port-title" mb={1}>
            {port.name.toUpperCase()}
          </Text>

          {/* Divider for this port */}
          <Box className="service-divider" />

          {/* Input & Output */}
          <Flex className="service-port" justify="space-between" align="center">
            {/* Input */}
            <Flex align="center">
              <Handle
                type="target"
                position={Position.Left}
                id={`port-${index}`}
                className="service-input-handle"
              />
              <Text className="service-port-text" ml={2}>
                {port.port}
              </Text>
            </Flex>

            {/* Output */}
            <Flex align="center">
              <Text className="service-port-text output" mr={2}>
                {port.targetPort ?? port.nodePort ?? "-"}
              </Text>
              <Handle
                type="source"
                position={Position.Right}
                id={`targetPort-${index}`}
                className="service-port-handle"
              />
            </Flex>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};
