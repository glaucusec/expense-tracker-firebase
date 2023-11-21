import React from "react";
import { Box, Flex, Spacer, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Flex>
        <Box p="4">
          <Heading as={"h2"} size={"sm"}>
            Welcome to Expense Tracker
          </Heading>
        </Box>

        <Spacer />

        <Box p="4">
          Your profile is Incomplete.{" "}
          <Link to={"/profile"}>
            <Text as="u">Complete Now</Text>
          </Link>
        </Box>
      </Flex>
    </>
  );
}
