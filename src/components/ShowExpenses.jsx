import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as Chakra from "@chakra-ui/react";
import { ExpensesContext } from "../context/ExpenseContext";

// import DeleteExpense from "./DeleteExpense";
// import EditExpense from "./EditExpense";

export default function ShowExpenses() {
  const ExpenseCtx = useContext(ExpensesContext);
  const expenses = ExpenseCtx.expenses;
  const expenseKeys = Object.keys(expenses);
  const toast = Chakra.useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await axios.get(
          "https://expense-tracker-fire-default-rtdb.firebaseio.com/expenses.json"
        );
        const receivedExpenses = response.data;
        setIsLoading(false);
        ExpenseCtx.setExpenseHandler(receivedExpenses == null ? {} : receivedExpenses);
      } catch (error) {
        console.log(error);
        setIsLoading(false);

        toast({
          title: error.response.data.message,
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
    fetchExpenses();
  }, []);

  if (isLoading) {
    return (
      <Chakra.Box padding={"1rem"}>
        <Chakra.SkeletonText mt="4" noOfLines={5} spacing="4" skeletonHeight="6" />
      </Chakra.Box>
    );
  }
  if (!isLoading && expenses.length == 0) {
    return (
      <Chakra.Card padding={"1rem"} mt={"1rem"}>
        <Chakra.Heading as={"h2"} size={"md"}>
          Empty Expenses
        </Chakra.Heading>
      </Chakra.Card>
    );
  }
  return (
    <Chakra.Card padding={"1rem"} mt={"1rem"}>
      <Chakra.Heading as={"h2"} size={"md"}>
        Added Expenses
      </Chakra.Heading>
      <Chakra.TableContainer>
        <Chakra.Table>
          <Chakra.Thead>
            <Chakra.Tr>
              <Chakra.Td>Amount</Chakra.Td>
              <Chakra.Td>Description</Chakra.Td>
              <Chakra.Td>Category</Chakra.Td>
              <Chakra.Td>Delete </Chakra.Td>
              <Chakra.Td>Edit </Chakra.Td>
            </Chakra.Tr>
          </Chakra.Thead>
          <Chakra.Tbody>
            {expenseKeys.map((key) => (
              <Chakra.Tr key={key}>
                <Chakra.Td>{expenses[key].amount}</Chakra.Td>
                <Chakra.Td>{expenses[key].description}</Chakra.Td>
                <Chakra.Td>{expenses[key].category}</Chakra.Td>
                {/* <Chakra.Td>
                  <Chakra.Text>
                    <DeleteExpense _id={key} />
                  </Chakra.Text>
                </Chakra.Td>
                <Chakra.Td>
                  <Chakra.Text>
                    <EditExpense expense={key} />
                  </Chakra.Text>
                </Chakra.Td> */}
              </Chakra.Tr>
            ))}
          </Chakra.Tbody>
        </Chakra.Table>
      </Chakra.TableContainer>
    </Chakra.Card>
  );
}
