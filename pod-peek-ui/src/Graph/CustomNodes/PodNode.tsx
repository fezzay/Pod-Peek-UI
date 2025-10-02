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
    containers: {
      name: string;
      image?: string;
      ports: { name: string; InternalPort: number }[];
      mounts: string[];
      env: { key: string; value: string }[];
    }[];
  };
}

export const PodNode: React.FC<PodNodeProps> = ({ data }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

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

      {/* Containers */}
      {data.containers?.map((container) => {
        const isOpen = expanded[container.name] ?? false;

        const leftHandles = [
          ...(container.mounts?.map((mount) => `${container.name}-mount-${mount}`) ?? []),
          ...(container.env?.map((env) => `${container.name}-env-${env.key}`) ?? []),
        ];

        const rightHandles = [...(container.ports?.map((port) => `${container.name}-port-${port.InternalPort}`) ?? [])];

        return (
          <Box key={container.name} className="pod-container-card">
            {/* Container Header */}
            <Flex justify="space-between" align="center" mb={1}>
              <Text className="pod-container-name">
                {container.name ?? `Container`}
              </Text>
              <IconButton
                aria-label="Toggle container"
                as={isOpen ? FiChevronUp : FiChevronDown}
                size="sm"
                onClick={() =>
                  setExpanded(prev => ({ ...prev, [container.name]: !isOpen }))
                }
                variant="ghost"
                color="#1a202c"
              />
            </Flex>

            {container.image && (
              <Text className="pod-container-image">{container.image}</Text>
            )}

            {isOpen ? (
              <>
                {/* Mounts */}
                {container.mounts?.length > 0 && (
                  <>
                    <Text className="pod-section-title left">Volume Mounts</Text>
                    <Box className="pod-divider" />
                    {container.mounts.map((mount, mIdx) => (
                      <Flex key={`${container.name}-mount-${mIdx}`} className="pod-item-row">
                        <Handle
                          type="target"
                          position={Position.Left}
                          id={`${container.name}-mount-${mIdx}`}
                          className="pod-handle left"
                        />
                        <Text className="pod-item-text left">{mount}</Text>
                      </Flex>
                    ))}
                  </>
                )}

                {/* Ports */}
                {container.ports?.length > 0 && (
                  <>
                    <Text className="pod-section-title right">Ports</Text>
                    <Box className="pod-divider" />
                    {container.ports.map((port, pIdx) => (
                      <Flex
                        key={`${container.name}-port-${pIdx}`}
                        className="pod-item-row"
                        justify="flex-end"
                      >
                        <Text className="pod-item-text right">
                          {port.name}:{port.InternalPort}
                        </Text>
                        <Handle
                          type="source"
                          position={Position.Right}
                          id={`${container.name}-port-${port.InternalPort}`}
                          className="pod-handle right"
                        />
                      </Flex>
                    ))}
                  </>
                )}

                {/* Env */}
                {container.env?.length > 0 && (
                  <>
                    <Text className="pod-section-title left">Environment</Text>
                    <Box className="pod-divider" />
                    {container.env.map((envVar) => (
                      <Flex key={`${container.name}-env-${envVar.key}`} className="pod-item-row">
                        <Handle
                          type="target"
                          position={Position.Left}
                          id={`${container.name}-env-${envVar.key}`}
                          className="pod-handle left"
                        />
                        <Text className="pod-item-text left">
                          {envVar.key}: {envVar.value}
                        </Text>
                      </Flex>
                    ))}
                  </>
                )}
              </>
            ) : (
              <>
                {/* Collapsed proxy handles */}
                <Box 
                  className="pod-container-collapsed"
                  position="relative" 
                >
                  {leftHandles.map((id) => ( 
                    <Handle 
                      key={`${container.name}-proxy-left-${id}`} 
                      type="target" 
                      position={Position.Left} 
                      id={id} 
                      className="pod-handle left collapsed" 
                    /> 
                  ))} 
                  {rightHandles.map((id) => ( 
                    <Handle 
                      key={`${container.name}-proxy-right-${id}`} 
                      type="source" 
                      position={Position.Right} 
                      id={id} 
                      className="pod-handle right collapsed" 
                    /> 
                  ))} 
                </Box> 
              </>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
