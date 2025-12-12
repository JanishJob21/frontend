import { useEffect, useState } from "react";
import API from "../api";

export default function AdminLeave() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // ------------------- GET TOKEN -------------------
  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in as admin");
      return null;
    }
    return token;
  };

  // ------------------- LOAD LEAVES -------------------
  const loadLeaves = async () => {
    const token = getToken();
    if (!token) return;

    setLoading(true);
    try {
      // ✅ Note: Removed double /api
      const res = await API.get("api/leave", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(res.data);
    } catch (err) {
      console.error("Error loading leaves:", err);
      alert("Failed to load leaves. Make sure you are logged in as admin.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------- UPDATE LEAVE STATUS -------------------
  const updateStatus = async (id, status) => {
    const token = getToken();
    if (!token) return;

    try {
      // ✅ Note: Removed double /api
      await API.put(
        `api/leave/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Reload leaves after update
      loadLeaves();
    } catch (err) {
      console.error("Error updating leave:", err);
      alert("Failed to update status. Make sure you are logged in as admin.");
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  if (loading) return <p>Loading leaves...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Leave Approval</h2>

      {leaves.length === 0 ? (
        <p>No leave requests found.</p>
      ) : (
        <ul>
          {leaves.map((l) => (
            <li key={l._id} style={{ marginBottom: 10 }}>
              <strong>{l.user?.name || "Unknown User"}</strong> —{" "}
              {l.fromDate} to {l.toDate} — <em>{l.status}</em>

              <button
                onClick={() => updateStatus(l._id, "Approved")}
                style={{
                  marginLeft: 10,
                  padding: "3px 8px",
                  cursor: "pointer",
                }}
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(l._id, "Rejected")}
                style={{
                  marginLeft: 5,
                  padding: "3px 8px",
                  cursor: "pointer",
                }}
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
