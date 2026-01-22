import "./App.css";
function Student({ courseCode, setCourseCode, markAttendance }) {
  return (
    <div className="studentpagediv">
      <h2 className="studentpage">Student Page</h2>

      <input
        className="course"
        type="number"
        placeholder="Course Code"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
      />

      <br />
      <br />

      <button className="markattendance" onClick={markAttendance}>
        Mark Attendance
      </button>
    </div>
  );
}

export default Student;
