import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteMember,
  fetchMemberById,
  getMemberById,
  getMemberStatus,
} from "../../features/members/memberSlice";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function MemberDetails() {
  //USE NAVIGATE
  const navigate = useNavigate();

  //USE STATE BY DELETE ID
  const [deletingId, setDeletingId] = useState(null);

  //USE PARAMS
  const { memberId } = useParams();

  //USE DISPATCH FUNCTION
  const dispatch = useDispatch();

  //USE SELECTOR TO GET MEMBER FROM STORE
  const member = useSelector(getMemberById);

  //DISPATCHING GET MEMBER API FOR DATA
  useEffect(() => {
    dispatch(fetchMemberById(memberId));
  }, [dispatch]);

  //GETTING FETCH STATUS FROM THE STORE
  const { fetchByIdStatus, deleteStatus } = useSelector(getMemberStatus);

  //HANDLE DELETE
  const handleDelete = async (memberId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this member?"
      );
      if (!confirmed) return;

      setDeletingId(memberId);
      await dispatch(deleteMember(memberId));
      setDeletingId(null);
    } catch (error) {
      console.log("DELETE ERROR", error);
      setDeletingId(null);
    }
  };

  //USE EFFECT TO NAVIGATE TO /MEMBERS IF DELTED SUCCESSFULLY
  useEffect(() => {
    if (deleteStatus === "success") {
      navigate("/members");
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
                <h1>Details of {member?.name}</h1>
                <div className="card">
                  <div className="card-header">{member?.name}</div>
                  <div className="card-body">
                    <p>
                      <strong>Email: </strong>
                      {member?.email}
                    </p>
                    <p>
                      <strong>Membership Type: </strong>
                      {member?.membershipType}
                    </p>
                    <Link
                      className="btn btn-info btn-sm"
                      to={`/members/${member?.title}/${member?._id}/edit-member`}
                    >
                      Edit Details
                    </Link>
                    <button
                      className="btn btn-danger btn-sm ms-3"
                      onClick={() => handleDelete(memberId)}
                      disabled={deletingId === member?._id}
                    >
                      {deletingId === member?._id ? "Deleting..." : "Delete"}
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
