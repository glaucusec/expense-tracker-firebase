import React from "react";
import { Box } from "@chakra-ui/react";
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
