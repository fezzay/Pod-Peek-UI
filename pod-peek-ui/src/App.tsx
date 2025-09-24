import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { useState } from "react";
import { Graph } from "./Graph/Graph";
import { Navbar } from "./Navbar/Navbar";
import "./App.css";

function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  return (
    <ChakraProvider value={defaultSystem}>
      <div className="app">
        <div className="app-navbar">
          <Navbar />
        </div>

        <main className="app-content">
          <div className="app-card">
            <Graph />
          </div>
        </main>
      </div>
    </ChakraProvider>
  );
}

export default App;
