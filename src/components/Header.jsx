import React, { useState } from "react";
import { Box, Flex, Spacer, Heading, Text, Button, Center } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../context/Auth";
import { Navigate } from "react-router-dom";

import { ColorModeToggler } from "./ColorModeToggler";
import DownloadFile from "./DownloadFile";

export default function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const expenses = useSelector((state) => state.expenses.expenses);
  let expensesTotal = 0;
  Object.keys(expenses).forEach((key) => {
    expensesTotal += Number(expenses[key].amount);
  });
  const loggedIn = auth.idToken !== "";
  const navigate = useNavigate();
  const [activatePremium, setActivePremium] = useState(false);

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
        {expensesTotal >= 10000 ? (
          <>
            {!activatePremium && (
              <Button onClick={() => setActivePremium(true)} colorScheme="yellow" size={"sm"}>
                Activate Premium
              </Button>
            )}

            {activatePremium && <ColorModeToggler />}
            {activatePremium && <DownloadFile />}
          </>
        ) : (
          ""
        )}
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
