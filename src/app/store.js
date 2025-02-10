import { configureStore } from "@reduxjs/toolkit";
import { bookSlice } from "../features/books/bookSlice.js";
import { memberSlice } from "../features/members/memberSlice.js";

export default configureStore({
  reducer: {
    books: bookSlice.reducer,
    members: memberSlice.reducer,
  },
});
