import { Button, useColorMode } from "@chakra-ui/react";

export const ColorModeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button size={"sm"} onClick={toggleColorMode}>
      Toggle to {colorMode === "light" ? "Dark" : "Light"}
    </Button>
  );
};
