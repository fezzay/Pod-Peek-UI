import { Box, Text, Flex } from "@chakra-ui/react";
import { Handle, Position } from "reactflow";
import "./ServiceNode.css";

interface ServiceNodeProps {
  data: {
    serviceName: string;
    type: string;
    ports: { InternalPort: number; TargetPort?: number; nodePort?: number; name: string }[];
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
      {data.ports.map((port) => {
        const handleId = port.name.toLowerCase().replace(/\s+/g, "-");

        return (
          <Box key={handleId} className="service-port-section">
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
                  id={`port-${port.InternalPort}`}
                  className="service-input-handle"
                />
                <Text className="service-port-text" ml={2}>
                  {port.InternalPort}
                </Text>
              </Flex>

              {/* Output */}
              <Flex align="center">
                <Text className="service-port-text output" mr={2}>
                  {port.TargetPort ?? port.nodePort ?? "-"}
                </Text>
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`targetPort-${port.TargetPort}`}
                  className="service-port-handle"
                />
              </Flex>
            </Flex>
          </Box>
        );
      })}
    </Box>
  );
};
