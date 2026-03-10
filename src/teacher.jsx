import Card from "./components/Card";
import Button from "./components/Button";
import Input from "./components/Input";

function Teacher({
  isTeacher,
  courseCode,
  setCourseCode,
  duration,
  setDuration,
  openAttendance,
  closeAttendance,
  txPending,
}) {
  if (!isTeacher) {
    return (
      <Card title="Teacher access" subtitle="Only the contract teacher can open or close attendance.">
        <p className="teacher-denied">
          You are not the teacher for this contract. Use the Student tab to mark attendance.
        </p>
      </Card>
    );
  }

  return (
    <Card
      title="Teacher"
      subtitle="Open or close an attendance session for a course."
    >
      <Input
        label="Course code"
        type="number"
        placeholder="e.g. 101"
        value={courseCode}
        onChange={setCourseCode}
        disabled={txPending}
      />
      <Input
        label="Duration (seconds)"
        type="number"
        placeholder="e.g. 300"
        value={duration}
        onChange={setDuration}
        hint="How long the attendance window stays open."
        disabled={txPending}
      />
      <div className="teacher-actions">
        <Button
          variant="success"
          loading={txPending}
          disabled={txPending || !courseCode || !duration}
          onClick={openAttendance}
        >
          Open attendance
        </Button>
        <Button
          variant="secondary"
          loading={txPending}
          disabled={txPending || !courseCode}
          onClick={closeAttendance}
        >
          Close attendance
        </Button>
      </div>
    </Card>
  );
}

export default Teacher;
