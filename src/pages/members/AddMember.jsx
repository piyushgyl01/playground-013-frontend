import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getMemberStatus,
  postMember,
} from "../../features/members/memberSlice";

export default function AddMember() {
  //SETTING INITIAL FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    membershipType: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  //useNavigate
  const navigate = useNavigate();

  //useDispatch
  const dispatch = useDispatch();

  //get add status state from the store
  const { addStatus } = useSelector(getMemberStatus);

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(postMember(formData));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/members");
      }, 3000);
    } catch (error) {
      console.log("POST ERROR", error);
    }
  };

  useEffect(() => {
    if (addStatus === "success") {
      setFormData({ name: "", email: "", membershipType: "" });
    }
  }, [addStatus, setFormData]);

  return (
    <main className="container my-5">
      <h1>Add Member</h1>
      {showSuccess && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Member has been successfully added!
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
              disabled={addStatus === "loading"}
            >
              {addStatus === "loading" ? "Adding" : "Add Member"}
            </button>
          </form>
    </main>
  );
}
