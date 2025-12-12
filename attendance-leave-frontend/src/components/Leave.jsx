import { useState, useEffect } from "react";
import API from "../api";

export default function Leave() {
  const [fromDate, setFrom] = useState("");
  const [toDate, setTo] = useState("");
  const [reason, setReason] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // ------------------- GET TOKEN -------------------
  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in!");
      return null;
    }
    return token;
  };

  // ------------------- APPLY LEAVE (POST) -------------------
  const applyLeave = async () => {
    if (!fromDate || !toDate || !reason) {
      return alert("Please fill all fields");
    }

    const token = getToken();
    if (!token) return;

    try {
      await API.post(
        "api/leave",
        { fromDate, toDate, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Leave applied successfully!");
      // Clear inputs
      setFrom("");
      setTo("");
      setReason("");
      load(); // refresh leave history
    } catch (err) {
      console.error("Apply Leave Error:", err);
      alert("Failed to apply leave. Maybe already applied today or session expired.");
    }
  };

  // ------------------- LOAD LEAVE LIST -------------------
 
const load = async () => {
  const token = getToken();
  if (!token) return;

  try {
    const res = await API.get("api/leave", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setList(res.data);
  } catch (err) {
    console.error("Load Error:", err);
    // Removed the alert to prevent popups on failure
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    load();
  }, []);

  if (loading) return <p>Loading leave history...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Leave Application</h2>

      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFrom(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        type="date"
        value={toDate}
        onChange={(e) => setTo(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <button onClick={applyLeave}>Apply</button>

     
   {list.length > 0 && (
  <ul>
    {list.map((l) => (
      <li key={l._id}>
        {l.fromDate} → {l.toDate} : <strong>{l.status}</strong>
      </li>
    ))}
  </ul>
)}


    </div>
  );
}
