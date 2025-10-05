import { useState } from "react";
import { ChakraProvider, defaultSystem, Box } from "@chakra-ui/react";
import { Graph } from "./Graph/Graph";
import { Navbar } from "./Navbar/Navbar";
import { NamespaceSelector } from "./NamespaceSelector/NamespaceSelector";
import "./App.css";
import type { JSX } from "react";

function App(): JSX.Element {
  const [namespace, setNamespace] = useState("pod-peek");

  const namespaces = ["default", "jellyfin", "pod-peek"];

  return (
    <ChakraProvider value={defaultSystem}>
      <div className="app">
        <div className="app-navbar">
          <Navbar />
        </div>

        <main className="app-content">
          <NamespaceSelector
            namespace={namespace}
            setNamespace={setNamespace}
            namespaces={namespaces}
          />

          <Box className="app-card">
            <Graph namespace={namespace} />
          </Box>
        </main>
      </div>
    </ChakraProvider>
  );
}

export default App;
