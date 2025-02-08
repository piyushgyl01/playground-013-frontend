import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteBooks,
  fetchBookById,
  getBookById,
  getBookStatus,
} from "../../features/books/bookSlice";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function BookDetails() {
  //USE NAVIGATE
  const navigate = useNavigate();

  //USE STATE BY DELETE ID
  const [deletingId, setDeletingId] = useState(null);

  //USE PARAMS
  const { bookId } = useParams();

  //USE DISPATCH FUNCTION
  const dispatch = useDispatch();

  //USE SELECTOR TO GET BOOKS FROM STORE
  const book = useSelector(getBookById);

  //DISPATCHING GET BOOK API FOR DATA
  useEffect(() => {
    dispatch(fetchBookById(bookId));
  }, [dispatch]);

  //GETTING FETCH STATUS FROM THE STORE
  const { fetchByIdStatus, deleteStatus } = useSelector(getBookStatus);

  const handleDelete = async (bookId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this book?"
      );
      if (!confirmed) return;

      setDeletingId(bookId);
      await dispatch(deleteBooks(bookId));
      setDeletingId(null);
    } catch (error) {
      console.log("DELETE ERROR: ", error);
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (deleteStatus === "success") {
      navigate("/books");
    }
  }, [deleteStatus, navigate]);

  return (
    <>
      <main className="container my-5">
        {fetchByIdStatus === "error" && (
          <p>Error occured while fetcing the data</p>
        )}
        {deleteStatus === "error" && (
          <p>Error occured while deleting the book</p>
        )}

        {fetchByIdStatus === "loading" ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="row">
              <div className="col-md-8">
                <h1>Details of {book?.title}</h1>
                <div className="card">
                  <div className="card-header">
                    {book?.title} by {book?.author}
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>ISBN: </strong>
                      {book?.isbn}
                    </p>
                    <p>
                      <strong>Genre: </strong>
                      {book?.genre}
                    </p>
                    <p>
                      <strong>Publication Year: </strong>
                      {book?.publicationYear}
                    </p>
                    <p>
                      <strong>Total Copies: </strong>
                      {book?.totalCopies}
                    </p>
                    <p>
                      <strong>Available Copies: </strong>
                      {book?.availableCopies}
                    </p>
                    <Link
                      className="btn btn-info btn-sm"
                      to={`/books/${book?.title}/${book?._id}/edit-book`}
                    >
                      Edit Details
                    </Link>
                    <button
                      className="btn btn-danger btn-sm ms-3"
                      onClick={() => handleDelete(bookId)}
                      disabled={deletingId === book?._id}
                    >
                      {deletingId === book?._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div> 
              <div className="col-md-4"></div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
