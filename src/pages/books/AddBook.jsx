import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookStatus, postBooks } from "../../features/books/bookSlice";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  //useNavigate
  const navigate = useNavigate();

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

  //useDispatch
  const dispatch = useDispatch();

  //get add status state from the store
  const { addStatus } = useSelector(getBookStatus);

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(postBooks(formData));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/books");
      }, 3000);
    } catch (error) {
      console.log("POST ERROR", error);
    }
  };

  useEffect(() => {
    if (addStatus === "success") {
      setFormData({
        title: "",
        author: "",
        isbn: "",
        genre: "",
        publicationYear: 0,
        totalCopies: 0,
        availableCopies: 0,
      });
    }
  }, [addStatus, setFormData]);

  return (
    <>
      <main className="container my-5">
        <h1> Add Book </h1>
        {showSuccess && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            Book has been successfully added!
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowSuccess(false)}
              aria-label="Close"
            ></button>
          </div>
        )}
        {addStatus === "error" && (
          <div className="alert alert-danger">Error adding book</div>
        )}
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
          <button className="btn btn-primary" type="submit">
            {addStatus === "loading" ? "Adding" : "Add Book"}
          </button>
        </form>
      </main>
    </>
  );
}
