import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./Expense";
import authReducer from "./Auth";

const store = configureStore({
  reducer: { expenses: expenseReducer, auth: authReducer },
});

export default store;
