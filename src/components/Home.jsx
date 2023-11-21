import React from "react";
import { Box, Flex, Spacer, Heading, Text, Button, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import VeifyEmail from "./VeifyEmail";

export default function Home() {
  return (
    <>
      <Box p={"4"}>
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
          </Box>
        </Flex>

        <VeifyEmail />
      </Box>
    </>
  );
}
