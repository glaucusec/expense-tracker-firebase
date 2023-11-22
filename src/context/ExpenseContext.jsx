import React, { createContext, useState } from "react";

export const ExpensesContext = createContext({});

export default function ExpensesProvider(props) {
  const [expenses, setExpenses] = useState({});

  const updateExpenseHandler = (newExpense) => {
    setExpenses({ ...expenses, ...newExpense });
  };

  const deleteExpenseHandler = (_id) => {
    const newExpenses = {};
    Object.keys(expenses).forEach((key) => {
      if (key !== _id) {
        newExpenses[key] = expenses[key];
      }
    });
    setExpenses(newExpenses);
  };

  const editExpenseHandler = (key, updatedExpense) => {
    const newExpenses = { ...expenses };
    newExpenses[key].amount = updatedExpense.amount;
    newExpenses[key].description = updatedExpense.description;
    newExpenses[key].category = updatedExpense.category;

    setExpenses(newExpenses);
  };

  const setExpenseHandler = (expenses) => {
    console.log(expenses);
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
