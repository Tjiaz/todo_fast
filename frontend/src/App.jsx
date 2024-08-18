import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import Headers from "./components/Headers";
import Todos from "./components/Todos";

function App() {
  return (
    <ChakraProvider>
      <Headers />
      <Todos />
    </ChakraProvider>
  );
}
export default App;
