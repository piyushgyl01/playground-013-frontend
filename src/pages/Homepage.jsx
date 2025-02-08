 
import { Link } from "react-router";

export default function Homepage() {
  return (
    <main className="container text-center">
      <section className="my-4 row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <img
            src="https://th.bing.com/th/id/OIG3.RxPo2OI7TLn8RtUSzu2s?w=1024&h=1024&rs=1&pid=ImgDetMain"
            alt="hero-img"
            className="img-fluid rounded"
          />
          <h1 className="mt-4">Find the books you love!!</h1>
          <p>Get the collection of premium handpicked books</p>
          <Link className="btn btn-primary" to={"/books"}>View books</Link>
        </div>
        <div className="col-md-2"></div>
      </section>
      <section className="my-4 row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <img
            src="https://th.bing.com/th/id/OIG3.im.eJJNnIvKOHOK5HJ.O?pid=ImgGn"
            alt="hero-img"
            className="img-fluid rounded"
          />
          <h1 className="mt-4">Recommend books!!</h1>
          <p>Add the books recommendations to the community</p>
          <Link className="btn btn-primary" to={"/add-book"}>Add book</Link>
        </div>
        <div className="col-md-2"></div>
      </section>
    </main>
  );
}