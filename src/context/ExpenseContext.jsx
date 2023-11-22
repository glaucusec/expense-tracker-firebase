import React, { createContext, useState } from "react";

export const ExpensesContext = createContext({});

export default function ExpensesProvider(props) {
  const [expenses, setExpenses] = useState({});

  const updateExpenseHandler = (newExpense) => {
    console.log(newExpense);
    setExpenses({ ...expenses, newExpense });
  };

  const deleteExpenseHandler = (_id) => {
    const newExpenses = expenses.filter((expense) => expense._id !== _id);
    setExpenses(newExpenses);
  };

  const editExpenseHandler = (updatedExpense) => {
    const updatedExpenses = expenses.map((expense) => {
      if (expense._id === updatedExpense._id) {
        // Create a new object with the updated properties
        return { ...expense, ...updatedExpense };
      }
      return expense;
    });

    setExpenses(updatedExpenses);
  };

  const setExpenseHandler = (expenses) => {
    setExpenses(expenses);
  };

  const expenseCtx = {
    expenses: expenses,
    setExpenseHandler: setExpenseHandler,
    deleteExpenseHandler: deleteExpenseHandler,
    editExpenseHandler: editExpenseHandler,
    updateExpenseHandler: updateExpenseHandler,
  };
  return <ExpensesContext.Provider value={expenseCtx}>{props.children}</ExpensesContext.Provider>;
}
