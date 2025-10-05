import { Box, Text } from "@chakra-ui/react";
import Select from "react-select";

interface NamespaceSelectorProps {
  namespace: string;
  setNamespace: (ns: string) => void;
  namespaces: string[];
}

export const NamespaceSelector: React.FC<NamespaceSelectorProps> = ({
  namespace,
  setNamespace,
  namespaces,
}) => {
  const options = namespaces.map((ns) => ({ value: ns, label: ns }));

  return (
    <Box className="app-card" mb={4}>
      <Text mb={2} fontWeight="bold">
        Select Namespace:
      </Text>
      <Select
        options={options}
        value={options.find((o) => o.value === namespace)}
        onChange={(option) => setNamespace(option?.value || namespaces[0])}
        styles={{
          control: (provided) => ({
            ...provided,
            width: 300,
            borderRadius: 8,
            borderColor: "#ccc",
            backgroundColor: "white",
            color: "black",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "black",
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "white",
            zIndex: 9999,
          }),
          option: (provided, state) => ({
            ...provided,
            color: "black",
            backgroundColor: state.isFocused
              ? "#f0f0f0" // subtle gray on hover
              : state.isSelected
              ? "#e2e8f0" // soft neutral for selected
              : "white",
          }),
        }}
      />
    </Box>
  );
};
