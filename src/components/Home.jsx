import React from "react";
import { Box, Flex, Spacer, Heading, Text, Button, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import VeifyEmail from "./VeifyEmail";
import Header from "./Header";
import ExpenseForm from "./ExpenseForm";
import ShowExpenses from "./ShowExpenses";

export default function Home() {
  return (
    <>
      <Box p={"4"}>
        <Header />
        <VeifyEmail />
        <ExpenseForm />
        <ShowExpenses />
      </Box>
    </>
  );
}
