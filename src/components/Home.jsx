import React from "react";
import { Box, Flex, Spacer, Heading, Text, Button, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import VeifyEmail from "./VeifyEmail";
import Header from "./Header";

export default function Home() {
  return (
    <>
      <Box p={"4"}>
        <Header />

        <VeifyEmail />
      </Box>
    </>
  );
}
