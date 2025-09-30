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
      name?: string;
      image?: string;
      ports: { name: string; port: number }[];
      mounts: string[];
      env: { key: string; value: string }[];
    }[];
  };
}

export const PodNode: React.FC<PodNodeProps> = ({ data }) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

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
      {data.containers?.map((container, cindex) => {
        const isOpen = expanded[cindex] ?? false;

        const leftHandles = [
          ...(container.mounts?.map((_, mIdx) => `c${cindex}-mount-${mIdx}`) ?? []),
          ...(container.env?.map((_, eIdx) => `c${cindex}-env-${eIdx}`) ?? []),
        ];

        const rightHandles = [...(container.ports?.map((_, pIdx) => `c${cindex}-port-${pIdx}`) ?? [])];

        return (
          <Box key={`container-${cindex}`} className="pod-container-card">
            {/* Container Header */}
            <Flex justify="space-between" align="center" mb={1}>
              <Text className="pod-container-name">
                {container.name ?? `Container ${cindex + 1}`}
              </Text>
              <IconButton
                aria-label="Toggle container"
                as={isOpen ? FiChevronUp : FiChevronDown}
                size="sm"
                onClick={() =>
                  setExpanded(prev => ({ ...prev, [cindex]: !isOpen }))
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
                      <Flex key={`c${cindex}-mount-${mIdx}`} className="pod-item-row">
                        <Handle
                          type="target"
                          position={Position.Left}
                          id={`c${cindex}-mount-${mIdx}`}
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
                        key={`c${cindex}-port-${pIdx}`}
                        className="pod-item-row"
                        justify="flex-end"
                      >
                        <Text className="pod-item-text right">
                          {port.name}:{port.port}
                        </Text>
                        <Handle
                          type="source"
                          position={Position.Right}
                          id={`c${cindex}-port-${pIdx}`}
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
                    {container.env.map((envVar, eIdx) => (
                      <Flex key={`c${cindex}-env-${eIdx}`} className="pod-item-row">
                        <Handle
                          type="target"
                          position={Position.Left}
                          id={`c${cindex}-env-${eIdx}`}
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
                      key={`c${cindex}-proxy-left`}
                      type="target"
                      position={Position.Left}
                      id={id}
                      className="pod-handle left collapsed"
                    />
                  ))}
                  {rightHandles.map((id) => (
                    <Handle
                      key={`c${cindex}-proxy-right`}
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
