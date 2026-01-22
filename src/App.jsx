import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";
import Teacher from "../../attendance-dApp/teacher.jsx";
import Student from "../../attendance-dApp/student.jsx";
import "./App.css";

const contractAddress = "0xb0f5e0771ba791DB4eE518D73055582a28bBe712";

function App() {
  const [account, setAccount] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [page, setPage] = useState("student");
  const [courseCode, setCourseCode] = useState("");
  const [duration, setDuration] = useState("");

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    setAccount(await signer.getAddress());
  }

  async function checkTeacher(address) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const teacherAddress = await contract.teacher();
    setIsTeacher(teacherAddress.toLowerCase() === address.toLowerCase());
  }

  useEffect(() => {
    if (account) checkTeacher(account);
  }, [account]);

  async function openAttendance() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.openAttendance(
      BigInt(duration),
      BigInt(courseCode),
    );
    await tx.wait();
    alert("Attendance opened");
  }

  async function closeAttendance() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.closeAttendance(BigInt(courseCode));
    await tx.wait();
    alert("Attendance closed");
  }

  async function markAttendance() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.markAttendance(BigInt(courseCode));
      await tx.wait();
      alert("Attendance marked");
    } catch (err) {
      console.error(err);
      const errorMessage = err?.reason || err?.message || "An error occurred";
      if (errorMessage.includes("Attendance is not open")) {
        alert("Attendance is not open for this course code.");
        return;
      }
    }
  }

  return (
    <>
      <div className="banner">
        <div className="overlay">
          <h1 className="heading">Attendance DApp</h1>
          <p className="subheading">Smart Attendance for smart classrooms!</p>
        </div>
      </div>
      <div className="logorow">
        {!account && (
          <button className="connect-button" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        {account && (
          <>
            <p className="para">
              <b>Connected:</b> {account}
            </p>
            <p>
              <b>Role:</b> {isTeacher ? "Teacher" : "Student"}
            </p>

            <button className="student" onClick={() => setPage("student")}>
              Student Page
            </button>

            <button className="teacher" onClick={() => setPage("teacher")}>
              Teacher Page
            </button>

            <hr />

            {page === "student" && (
              <Student
                courseCode={courseCode}
                setCourseCode={setCourseCode}
                markAttendance={markAttendance}
              />
            )}

            {page === "teacher" && (
              <Teacher
                isTeacher={isTeacher}
                courseCode={courseCode}
                setCourseCode={setCourseCode}
                duration={duration}
                setDuration={setDuration}
                openAttendance={openAttendance}
                closeAttendance={closeAttendance}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
