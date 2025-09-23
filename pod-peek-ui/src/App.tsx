import { ChakraProvider, defaultSystem  } from "@chakra-ui/react";
import { useState } from "react";
import { Graph } from "./Graph/Graph";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ChakraProvider value={defaultSystem}>
      <Graph />
    </ChakraProvider>
  );
}

export default App;