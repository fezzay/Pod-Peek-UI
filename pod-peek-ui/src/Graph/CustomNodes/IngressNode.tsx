import { Box, Text, Flex, Link } from "@chakra-ui/react";
import { Handle, Position } from "reactflow";
import "./IngressNode.css";

interface IngressNodeProps {
  data: {
    ingressName: string;
    hosts: string[];
    rules: { path: string; service: string; port: number }[];
  };
}

export const IngressNode: React.FC<IngressNodeProps> = ({ data }) => {
  return (
    <Box className="ingress-node">
      {/* Header */}
      <Flex className="ingress-header">
        <Text className="ingress-name">{data.ingressName}</Text>
      </Flex>

      <Box className="ingress-divider" />

      {/* Rules (handles on the LEFT now) */}
      {data.rules && data.rules.length > 0 && (
        <Box>
          <Text fontSize="sm" fontWeight="bold" mb={1}>
            Rules
          </Text>
          {data.rules.map((rule) => {
            const url = `${data.hosts[0]}${rule.path}`;
            return (
              <Flex key={rule.port} className="ingress-rule" justify="flex-start">
                <Handle
                  type="target"
                  position={Position.Left}
                  id={`rule-${rule.port}`}
                  className="ingress-output-handle"
                />
                <Link
                  href={url.startsWith("http") ? url : `https://${url}`}
                  textDecoration="underline"
                  className="ingress-rule-text"
                >
                  {url}
                </Link>
              </Flex>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
