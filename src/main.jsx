import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import BookView from "./pages/books/BookView";
import MemberView from "./pages/members/MemberView";
import AddBook from "./pages/books/AddBook";
import AddMember from "./pages/members/AddMember";
import EditBook from "./pages/books/EditBook";
import BookDetails from "./pages/books/BookDetails";
import MemberDetails from "./pages/members/MemberDetails";
import EditMember from "./pages/members/EditMember";

import { Provider } from "react-redux";

import store from "./app/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/books",
        element: <BookView />,
      },
      {
        path: "/members",
        element: <MemberView />,
      },
      {
        path: "/add-book",
        element: <AddBook />,
      },
      {
        path: "/add-member",
        element: <AddMember />,
      },
      {
        path: "/books/:bookName/:bookId",
        element: <BookDetails />,
      },
      {
        path: "/books/:bookName/:bookId/edit-book",
        element: <EditBook />,
      },
      {
        path: "/members/:memberName/:memberId",
        element: <MemberDetails />,
      },
      {
        path: "/members/:memberName/:memberId/edit-member",
        element: <EditMember />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <Homepage />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
