import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

//API CALLS USING REDUX THUNKS

//GET ALL BOOKS
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  try {
    const response = await axios.get(
      "https://playground-013-backend.vercel.app/books"
    );

    return response.data;
  } catch (error) {
    console.error("Fetch Error: ", error);
    throw error;
  }
});

//GET BOOK BY ID
export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id) => {
    try {
      const response = await axios.get(
        `https://playground-013-backend.vercel.app/books/${id}`
      );

      return response.data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      throw error;
    }
  }
);

//POST BOOK
export const postBooks = createAsyncThunk(
  "books/postBooks",
  async (formData) => {
    try {
      const response = await axios.post(
        "https://playground-013-backend.vercel.app/books",
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Post Error: ", error);
      throw error;
    }
  }
);

//UPDATE BOOK
export const updateBooks = createAsyncThunk(
  "books/updateBooks",
  async ({ id, formData }) => {
    try {
      const response = await axios.put(
        `https://playground-013-backend.vercel.app/books/${id}`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Put Error: ", error);
      throw error;
    }
  }
);

//DELETE BOOK
export const deleteBooks = createAsyncThunk("books/deleteBooks", async (id) => {
  try {
    const response = await axios.delete(
      `https://playground-013-backend.vercel.app/books/${id}`
    );

    return { id };
  } catch (error) {
    console.error("Delete Error: ", error);
    throw error;
  }
});

export const bookSlice = createSlice({
  name: "Books",
  initialState: {
    books: [],
    singleBook:null,
    fetchStatus: "idle",
    error: null,
    fetchByIdStatus: "idle",
    addStatus: "idle",
    deleteStatus: "idle",
    updateStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //FETCH BOOKS STATUS HANDLERS
      .addCase(fetchBooks.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.fetchStatus = "error";
        state.error = action.error.message;
      })
      //FETCH BOOK BY ID STATUS HANDLERS
      .addCase(fetchBookById.pending, (state) => {
        state.fetchByIdStatus = "loading";
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.fetchByIdStatus = "success";
        state.singleBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.fetchByIdStatus = "error";
        state.error = action.error.message;
      })
      //ADD BOOK STATUS HANDLERS
      .addCase(postBooks.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(postBooks.fulfilled, (state, action) => {
        state.addStatus = "success";
        state.books.push(action.payload);
      })
      .addCase(postBooks.rejected, (state, action) => {
        state.addStatus = "error";
        state.error = action.error.message;
      })
      //DELETE BOOK STATUS HANDLERS
      .addCase(deleteBooks.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteBooks.fulfilled, (state, action) => {
        state.deleteStatus = "success";
        state.books = state.books.filter(
          (book) => book._id !== action.payload.id
        );
      })
      .addCase(deleteBooks.rejected, (state, action) => {
        state.deleteStatus = "error";
        state.error = action.error.message;
      })
      //UPDATE TEACHER STATUS HANDLERS
      .addCase(updateBooks.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateBooks.fulfilled, (state, action) => {
        state.updateStatus = "success";
        const updatedBook = action.payload;
        const index = state.books.findIndex(
          (book) => book._id === updatedBook._id
        );
        if (index !== -1) {
          state.books[index] = updatedBook;
        }
      })
      .addCase(updateBooks.rejected, (state, action) => {
        state.updateStatus = "error";
        state.error = action.error.message;
      });
  },
});

export const getAllBooks = (state) => state.books.books;
export const getBookById = (state) => state.books.singleBook;

export const getBookStatus = createSelector(
  (state) => state.books.fetchStatus,
  (state) => state.books.addStatus,
  (state) => state.books.deleteStatus,
  (state) => state.books.updateStatus,
  (state) => state.books.fetchByIdStatus,

  (fetchStatus, addStatus, deleteStatus, updateStatus, fetchByIdStatus) => ({
    fetchStatus,
    addStatus,
    deleteStatus,
    updateStatus,
    fetchByIdStatus,
  })
);

export default bookSlice.reducer;
