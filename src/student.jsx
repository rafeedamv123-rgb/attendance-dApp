import Card from "./components/Card";
import Button from "./components/Button";
import Input from "./components/Input";

function Student({ courseCode, setCourseCode, markAttendance, txPending }) {
  return (
    <Card
      title="Mark attendance"
      subtitle="Enter the course code and submit before the session closes."
    >
      <Input
        label="Course code"
        type="number"
        placeholder="e.g. 101"
        value={courseCode}
        onChange={setCourseCode}
        disabled={txPending}
      />
      <Button
        variant="primary"
        size="lg"
        loading={txPending}
        disabled={txPending || !courseCode}
        onClick={markAttendance}
      >
        Mark attendance
      </Button>
    </Card>
  );
}

export default Student;
