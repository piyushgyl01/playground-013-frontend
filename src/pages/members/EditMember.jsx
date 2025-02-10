import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import {
  fetchMemberById,
  getMemberById,
  getMemberStatus,
  updateMember,
} from "../../features/members/memberSlice";

export default function EditMember() {
  //SETTING INITIAL FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    membershipType: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  //useNavigate
  const navigate = useNavigate();

  //useParams
  const { memberId } = useParams();

  //useDispatch
  const dispatch = useDispatch();

  //selecting the single from the state
  const foundMember = useSelector(getMemberById);

  //useEffect
  useEffect(() => {
    dispatch(fetchMemberById(memberId));
  }, [dispatch, memberId]);

  const { fetchByIdStatus, updateStatus } = useSelector(getMemberStatus);

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateMember({ memberId, formData }));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate(`/members/${foundMember.title}/${memberId}`);
      }, 3000);
    } catch (error) {
      console.log("PUT ERROR", error);
    }
  };

  //useEffect to pre-fill the form fields
  useEffect(() => {
    if (foundMember) {
      setFormData({
        name: foundMember.name,
        email: foundMember.email,
        membershipType: foundMember.membershipType,
      });
    }
  }, [foundMember]);
  return (
    <>
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
            <h1> Edit Member Details of {foundMember?.name} </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="membershipType" className="form-label">
                  Membership Type:
                </label>
                <select
                  className="form-select"
                  id="membershipType"
                  value={formData.membershipType}
                  onChange={(e) =>
                    setFormData({ ...formData, membershipType: e.target.value })
                  }
                  required
                >
                  <option value="">Select Membership Type</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Student">Student</option>
                </select>
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
    </>
  );
}
