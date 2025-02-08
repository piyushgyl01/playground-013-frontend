import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, getAllBooks, getBookStatus } from "./bookSlice";
import { Link } from "react-router-dom";

export default function BookList() {
  //USE DISPATCH FUNCTION
  const dispatch = useDispatch();

  //USE SELECTOR TO GET BOOKS FROM STORE
  const books = useSelector(getAllBooks);

  //DISPATCHING GET BOOK API FOR DATA
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  //GETTING FETCH STATUS FROM THE STORE
  const { fetchStatus } = useSelector(getBookStatus);

  return (
    <>
      {fetchStatus === "loading" && <p>Loading...</p>}
      <ul className="list-group">
        {books.map((book) => (
          <Link
            key={book._id}
            to={`/books/${book.title}/${book._id}`}
            className="link-opacity-50-hover"
          >
            <li className="list-group-item">
              {book.title} by {book.author} in {book.publicationYear}
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}
