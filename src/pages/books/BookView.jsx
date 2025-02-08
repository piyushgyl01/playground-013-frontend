import BookList from "../../features/books/BookList";
import { Link } from "react-router-dom";

export default function BookView() {
  return (
    <main className="container my-5">
      <h1>Books View</h1>
      <Link className="btn btn-primary mb-3" to="/add-book" >Add Book</Link>

      <BookList />
    </main>
  );
}
