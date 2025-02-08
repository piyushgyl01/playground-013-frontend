import { configureStore } from "@reduxjs/toolkit";
import { bookSlice } from "../features/books/bookSlice.js";

export default  configureStore({
  reducer: {
    books: bookSlice.reducer,
  },
});
