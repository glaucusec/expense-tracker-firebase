import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = { expenses: {} };

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    setExpense(state, action) {
      state.expenses = action.payload;
    },
    deleteExpense(state, action) {
      const _id = action.payload;
      const newExpenses = {};
      Object.keys(state.expenses).forEach((key) => {
        if (key !== _id) {
          newExpenses[key] = state.expenses[key];
        }
      });
      state.expenses = newExpenses;
    },
    editExpense(state, action) {
      const key = action.payload.key;
      const updatedExpense = action.payload.updatedExpense;
      const newExpenses = { ...state.expenses };
      newExpenses[key].amount = updatedExpense.amount;
      newExpenses[key].description = updatedExpense.description;
      newExpenses[key].category = updatedExpense.category;

      state.expenses = newExpenses;
    },
    updateExpense(state, action) {
      const newExpense = action.payload;
      const updatedExpense = { ...state.expenses, ...newExpense };
      state.expenses = updatedExpense;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
