function Teacher({
  isTeacher,
  courseCode,
  setCourseCode,
  duration,
  setDuration,
  openAttendance,
  closeAttendance,
}) {
  if (!isTeacher) {
    return <p>You are not the teacher for this contract.</p>;
  }

  return (
    <div>
      <h2>Teacher Page</h2>

      <input
        className="course"
        type="number"
        placeholder="Course Code"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
      />

      <br />
      <br />

      <input
        className="course"
        type="number"
        placeholder="Duration (seconds)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <br />
      <br />
      <div className="close">
        <button className="markattendance" onClick={openAttendance}>
          Open Attendance
        </button>

        <button className="markattendance" onClick={closeAttendance}>
          Close Attendance
        </button>
      </div>
    </div>
  );
}

export default Teacher;
