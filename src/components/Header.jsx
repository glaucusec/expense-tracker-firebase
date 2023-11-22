import React, { useContext } from "react";
import { Box, Flex, Spacer, Heading, Text, Button, Center } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Header() {
  const AuthCtx = useContext(AuthContext);
  const loggedIn = AuthContext.idToken !== "";
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    localStorage.removeItem("idToken");
    AuthCtx.AuthStateUpdater("");
  };

  if (!loggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Flex borderBottom={"1px"} pb={"1rem"}>
      <Box>
        <Heading as={"h2"} size={"sm"}>
          Welcome to Expense Tracker
        </Heading>
      </Box>

      <Spacer />

      <Box>
        Your profile is Incomplete.{" "}
        <Link to={"/profile"}>
          <Text as="u">Complete Now</Text>
        </Link>
        <Button onClick={logoutHandler} size={"sm"}>
          Log Out
        </Button>
      </Box>
    </Flex>
  );
}
