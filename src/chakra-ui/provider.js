import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./chakra-ui.custom-theme";

const ChakraUIProvider = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export { ChakraUIProvider };
