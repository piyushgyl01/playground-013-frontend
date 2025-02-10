
import MemberList from "../../features/members/MemberList";
import { Link } from "react-router-dom";

export default function MemberView() {
  return (
    <main className="container my-5">
      <h1>Members View</h1>
      <Link className="btn btn-primary mb-3" to="/add-member">
        Add Member
      </Link>

      <MemberList />
    </main>
  );
}
