import { useEffect, useState } from "react";
import API from "../api";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState("Present");
  const [todayStatus, setTodayStatus] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  // ------------------- GET TOKEN -------------------
  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in!");
      return null;
    }
    return token;
  };

  // ------------------- LOAD ATTENDANCE -------------------
  const loadData = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await API.get("/attendance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(res.data);

      const todayRecord = res.data.find(r => r.date === today);
      if (todayRecord) {
        setTodayStatus(todayRecord.status);
        setStatus(todayRecord.status);
      } else {
        setTodayStatus(null);
        setStatus("Present");
      }
    } catch (error) {
      console.error("Error loading attendance:", error);
      alert("Failed to load attendance records.");
    }
  };

  // ------------------- ADD OR UPDATE ATTENDANCE -------------------
  const addOrUpdateAttendance = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const todayRecord = records.find(r => r.date === today);

      if (todayRecord) {
        // Update existing record
        await API.put(
          `/attendance/${todayRecord._id}`,
          { status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create new record
        await API.post(
          "/attendance",
          { date: today, status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      alert(todayRecord ? "Attendance updated!" : "Attendance marked!");
      await loadData();
    } catch (error) {
      console.error("Error updating attendance:", error);
      if (error.response) {
        alert(`Error: ${error.response.data || "Failed to update attendance"}`);
      } else {
        alert("Server error or network issue.");
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Attendance</h2>

      <div style={{ marginBottom: 20 }}>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ marginRight: 10 }}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button
          onClick={addOrUpdateAttendance}
          style={{
            padding: "5px 15px",
            backgroundColor: todayStatus ? "#4CAF50" : "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {todayStatus ? "Update Today" : "Mark Today"}
        </button>

        {todayStatus && (
          <span style={{ marginLeft: 10 }}>
            Today's status: <strong>{todayStatus}</strong>
          </span>
        )}
      </div>

      <h3 style={{ marginTop: 20 }}>History</h3>
      {records.length === 0 ? (
        <p>No attendance records yet.</p>
      ) : (
        <ul>
          {records.map((r) => (
            <li key={r._id}>
              {r.date} — {r.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
