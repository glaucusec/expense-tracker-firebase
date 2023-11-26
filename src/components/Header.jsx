import React from "react";
import { Box, Flex, Spacer, Heading, Text, Button, Center } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../context/Auth";
import { Navigate } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const loggedIn = auth.idToken !== "";
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    localStorage.removeItem("idToken");
    dispatch(authActions.remoteAuth());
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
