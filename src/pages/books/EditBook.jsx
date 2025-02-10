import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchBookById,
  getBookById,
  getBookStatus,
  updateBooks,
} from "../../features/books/bookSlice";
import { useEffect, useState } from "react";

export default function EditBook() {
  //SETTING INITIAL FORM STATE
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    publicationYear: 0,
    totalCopies: 0,
    availableCopies: 0,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  //useNavigate
  const navigate = useNavigate();

  //useParams
  const { bookId } = useParams();

  //useDispatch
  const dispatch = useDispatch();

  //selecting the single from the state
  const foundBook = useSelector(getBookById);

  //useEffect
  useEffect(() => {
    dispatch(fetchBookById(bookId));
  }, [dispatch, bookId]);

  //getting status state from store
  const { fetchByIdStatus, updateStatus } = useSelector(getBookStatus);

  //handleSubmt
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateBooks({ bookId, formData }));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate(`/books/${foundBook.title}/${bookId}`);
      }, 3000);
    } catch (error) {
      console.log("PUT ERROR", error);
    }
  };

  //useEffect to pre-fill the form fields
  useEffect(() => {
    if (foundBook) {
      setFormData({
        title: foundBook.title,
        author: foundBook.author,
        isbn: foundBook.isbn,
        genre: foundBook.genre,
        publicationYear: foundBook.publicationYear,
        totalCopies: foundBook.totalCopies,
        availableCopies: foundBook.availableCopies,
      });
    }
  }, [foundBook]);

  return (
    <main className="container my-5">
      {fetchByIdStatus === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          {showSuccess && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              Changes has been successfully saved!
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowSuccess(false)}
                aria-label="Close"
              ></button>
            </div>
          )}
          <h1> Edit Details of {foundBook?.title}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title:
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author:
              </label>
              <input
                type="text"
                className="form-control"
                id="author"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="isbn" className="form-label">
                ISBN:
              </label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                value={formData.isbn}
                onChange={(e) =>
                  setFormData({ ...formData, isbn: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="genre" className="form-label">
                Genre:
              </label>
              <select
                className="form-select"
                id="genre"
                value={formData.genre}
                onChange={(e) =>
                  setFormData({ ...formData, genre: e.target.value })
                }
                required
              >
                <option value="">Select Genre</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Technology">Technology</option>
                <option value="History">History</option>
                <option value="Literature">Literature</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="publicationYear" className="form-label">
                Publication Year:
              </label>
              <input
                type="number"
                className="form-control"
                id="publicationYear"
                value={formData.publicationYear}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    publicationYear: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="totalCopies" className="form-label">
                Total Copies:
              </label>
              <input
                type="number"
                className="form-control"
                id="totalCopies"
                value={formData.totalCopies}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalCopies: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="availableCopies" className="form-label">
                Available Copies:
              </label>
              <input
                type="number"
                className="form-control"
                id="availableCopies"
                value={formData.availableCopies}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableCopies: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={updateStatus === "loading"}
            >
              {updateStatus === "loading" ? "Saving" : "Save Changes"}
            </button>
          </form>
        </>
      )}
    </main>
  );
}
