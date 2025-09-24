import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Handle, Position } from "reactflow";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState } from "react";
import "./PodNode.css";

interface PodNodeProps {
  data: {
    podName: string;
    status: string;
    replicasRunning?: number;
    replicasTotal?: number;
    ports: { name: string; port: number }[];
    inputs?: string[];
    env?: { key: string; value: string }[]; // environment variables
  };
}

export const PodNode: React.FC<PodNodeProps> = ({ data }) => {
  const [showEnv, setShowEnv] = useState(false);

  const percent =
    data.replicasRunning && data.replicasTotal
      ? Math.round((data.replicasRunning / data.replicasTotal) * 100)
      : 0;

  const statusColor = data.status === "Running" ? "#4ade80" : "#f56565";

  return (
    <Box className="pod-node">
      {/* Pod Header */}
      <Flex className="pod-header">
        <Text className="pod-name">{data.podName}</Text>

        <Flex align="center" gap={3}>
          <Text className="pod-status" color={statusColor}>
            {data.status}
          </Text>

          {data.replicasRunning !== undefined && data.replicasTotal !== undefined && (
            <Box className="pod-replicas-circle">
              <CircularProgressbar
                value={percent}
                text={""}
                styles={buildStyles({
                  pathColor: statusColor,
                  trailColor: "#e2e8f0",
                  strokeLinecap: "round",
                })}
              />
              <Box className="pod-replicas-text">
                {data.replicasRunning}/{data.replicasTotal}
              </Box>
            </Box>
          )}
        </Flex>
      </Flex>

      <Box className="pod-divider" />

      {/* Regular Inputs */}
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
              <Text className="pod-input-text">{input}</Text>
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

      {/* Collapsible Environment Variables */}
      {data.env && data.env.length > 0 && (
        <Box mt={2}>
          {/* Divider + Toggle */}
          <Flex align="center" justify="center" mb={2} position="relative">
            <Box flex="1" height="1px" bg="gray.300" mr={2} />
            <IconButton
              aria-label="Toggle env"
              as={showEnv ? FiChevronUp : FiChevronDown}
              size="sm"
              onClick={() => setShowEnv(!showEnv)}
              variant="ghost"
              color="#1a202c"
            />
            <Box flex="1" height="1px" bg="gray.300" ml={2} />
          </Flex>

          {/* Collapsed handle */}
          {!showEnv && (
            <Box>
                <Flex
                className="pod-input"
                align="center"
                  position="relative"
                >
                    {data.env.map((_, idx) => (
                  <Handle
                    type="target"
                    position={Position.Left}
                    id={`env-${idx}`}
                    className="pod-input-handle"
                  />
              ))}
              <Text className="pod-input-text">
                    Environment Variables
                  </Text>
                </Flex>
            </Box>
          )}

          {/* Expanded env variables */}
          {showEnv && (
            <Box>
              {data.env.map((envVar, idx) => (
                <Flex
                  key={idx}
                  className="pod-input"
                  align="center"
                  position="relative"
                >
                  <Handle
                    type="target"
                    position={Position.Left}
                    id={`env-${idx}`}
                    className="pod-input-handle"
                  />
                  <Text className="pod-input-text">
                    {envVar.key}: {envVar.value}
                  </Text>
                </Flex>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
