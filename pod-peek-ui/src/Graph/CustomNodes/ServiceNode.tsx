import { Box, Text, Flex } from "@chakra-ui/react";
import { Handle, Position } from "reactflow";
import "./ServiceNode.css";

interface ServiceNodeProps {
  data: {
    name: string;
    type: string;
    ports: {
      internalPort: number;
      targetPort?: number | null;
      nodePort?: number | null;
      name?: string | null;
    }[];
  };
}

export const ServiceNode: React.FC<ServiceNodeProps> = ({ data }) => {
  return (
    <Box className="service-node">
      {/* Node Header */}
      <Flex className="service-header">
        <Text className="service-name">{data.name}</Text>
        <Text className="service-type">{data.type}</Text>
      </Flex>

      <Box className="service-divider" />

      {/* Port Sections */}
      {data.ports?.map((port, idx) => {
        // Safely generate handle ID
        const portName = port.name ?? `port-${port.internalPort}`;
        const handleId = portName.toLowerCase().replace(/\s+/g, "-");

        return (
          <Box key={handleId + idx} className="service-port-section">
            {/* Port Title */}
            <Text className="service-port-title" mb={1}>
              {port.name?.toUpperCase() ?? `PORT ${port.internalPort}`}
            </Text>

            {/* Divider */}
            <Box className="service-divider" />

            {/* Input & Output */}
            <Flex className="service-port" justify="space-between" align="center">
              {/* Input */}
              <Flex align="center">
                <Handle
                  type="target"
                  position={Position.Left}
                  id={`port-${port.internalPort}`}
                  className="service-input-handle"
                />
                <Text className="service-port-text" ml={2}>
                  {port.internalPort}
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
                  id={`targetPort-${port.targetPort ?? port.nodePort ?? port.internalPort}`}
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
