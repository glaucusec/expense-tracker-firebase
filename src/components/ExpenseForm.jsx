import React, { useRef, useState } from "react";
import * as Chakra from "@chakra-ui/react";
import InputField from "./ui/InputField";
import axios from "axios";
import { useDispatch } from "react-redux";
import { expenseActions } from "../context/Expense";

export default function ExpenseForm() {
  const dispatch = useDispatch();
  const toast = Chakra.useToast();
  const [loading, setLoading] = useState(false);

  const amountRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      amount: amountRef.current.value,
      description: descRef.current.value,
      category: categoryRef.current.value,
    };

    try {
      const response = await axios.post(
        `https://expense-tracker-fire-default-rtdb.firebaseio.com/expenses.json`,
        data
      );
      if (response.status == 200) {
        toast({
          title: "Success",
          description: "Expense created succesfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        const newExpense = {};
        newExpense[response.data.name] = data;
        dispatch(expenseActions.updateExpense(newExpense));
        // ExpenseCtx.updateExpenseHandler(newExpense);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast({
        title: error.response.data.message,
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        <Chakra.Card padding={"1rem"}>
          <Chakra.Heading as={"h2"} size={"md"}>
            Add New Expense
          </Chakra.Heading>
          <InputField
            type={"number"}
            reference={amountRef}
            label={"Amount"}
            helperText={"Enter the amount of the expense"}
          />
          <InputField
            type={"text"}
            reference={descRef}
            label={"Description"}
            helperText={"Enter the description of the expense"}
          />
          <Chakra.FormLabel>Category </Chakra.FormLabel>
          <Chakra.Select placeholder="Select option" ref={categoryRef}>
            <option value="Fuel">Fuel</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Beauty/Wellness">Beauty/Wellness</option>
            <option value="Pets">Pets</option>
            <option value="Shopping">Shopping</option>
          </Chakra.Select>
          <Chakra.Box pt={"1rem"}>
            <Chakra.ButtonGroup>
              <Chakra.Button
                isLoading={loading ? true : false}
                type="submit"
                colorScheme="blue"
                size={"sm"}
              >
                Add Expense
              </Chakra.Button>
            </Chakra.ButtonGroup>
          </Chakra.Box>
        </Chakra.Card>
      </form>
    </React.Fragment>
  );
}
