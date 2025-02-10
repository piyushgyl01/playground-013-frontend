import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMembers, getAllMembers, getMemberStatus } from "./memberSlice";
import { Link } from "react-router-dom";

export default function MemberList() {
  //USE DISPATCH FUNCTION
  const dispatch = useDispatch();

  //USE SELECTOR TO GET MEMBERS FROM STORE
  const members = useSelector(getAllMembers);

  //DISPATCH GET MEMBERS API FOR DATA
  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  //GETTING FETCH STATUS FROM THE STORE
  const { fetchStatus } = useSelector(getMemberStatus);

  return (
    <>
      {fetchStatus === "loading" && <p>Loading...</p>}
      <ul className="list-group">
        {members.map((member) => (
          <Link
            key={member._id}
            to={`/members/${member.name}/${member._id}`}
            className="link-opacity-50-hover"
          >
            <li className="list-group-item">
              {member.name} - {member.email} - {member.membershipType}
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}
