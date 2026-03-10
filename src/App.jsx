import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { useContract } from "./hooks/useContract";
import { truncateAddress, copyToClipboard } from "./utils/format";
import Teacher from "./teacher.jsx";
import Student from "./student.jsx";
import Button from "./components/Button";
import Toast from "./components/Toast";
import "./App.css";

function App() {
  const [account, setAccount] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [page, setPage] = useState("student");
  const [courseCode, setCourseCode] = useState("");
  const [duration, setDuration] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [txPending, setTxPending] = useState(false);
  const [toast, setToast] = useState({ visible: false, type: "info", message: "" });

  const { getContractReadOnly, getContractWithSigner } = useContract();

  const showToast = useCallback((type, message) => {
    setToast({ visible: true, type, message });
    const t = setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 4000);
    return () => clearTimeout(t);
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      showToast("error", "Please install MetaMask");
      return;
    }
    setConnecting(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      setAccount(await signer.getAddress());
      showToast("success", "Wallet connected");
    } catch (err) {
      const msg = err?.message?.includes("rejected") ? "Connection rejected" : "Failed to connect";
      showToast("error", msg);
    } finally {
      setConnecting(false);
    }
  }

  async function checkTeacher(address) {
    try {
      const contract = await getContractReadOnly();
      const teacherAddress = await contract.teacher();
      setIsTeacher(teacherAddress.toLowerCase() === address.toLowerCase());
    } catch {
      setIsTeacher(false);
    }
  }

  useEffect(() => {
    if (account) checkTeacher(account);
  }, [account]);

  async function openAttendance() {
    setTxPending(true);
    try {
      const contract = await getContractWithSigner();
      const tx = await contract.openAttendance(BigInt(duration), BigInt(courseCode));
      await tx.wait();
      showToast("success", "Attendance opened");
    } catch (err) {
      showToast("error", err?.reason || err?.shortMessage || "Transaction failed");
    } finally {
      setTxPending(false);
    }
  }

  async function closeAttendance() {
    setTxPending(true);
    try {
      const contract = await getContractWithSigner();
      const tx = await contract.closeAttendance(BigInt(courseCode));
      await tx.wait();
      showToast("success", "Attendance closed");
    } catch (err) {
      showToast("error", err?.reason || err?.shortMessage || "Transaction failed");
    } finally {
      setTxPending(false);
    }
  }

  async function markAttendance() {
    setTxPending(true);
    try {
      const contract = await getContractWithSigner();
      const tx = await contract.markAttendance(BigInt(courseCode));
      await tx.wait();
      showToast("success", "Attendance marked");
    } catch (err) {
      const msg = err?.reason || err?.shortMessage || "";
      if (msg.includes("Attendance is not open") || msg.includes("not open")) {
        showToast("error", "Attendance is not open for this course.");
      } else {
        showToast("error", msg || "Transaction failed");
      }
    } finally {
      setTxPending(false);
    }
  }

  async function handleCopyAddress() {
    if (!account) return;
    const ok = await copyToClipboard(account);
    showToast(ok ? "success" : "error", ok ? "Address copied" : "Copy failed");
  }

  return (
    <>
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-brand">
            <span className="app-brand__icon" aria-hidden>◉</span>
            <div>
              <h1 className="app-brand__title">Attendance dApp</h1>
              <p className="app-brand__tagline">Smart attendance on-chain</p>
            </div>
          </div>
          <div className="app-header__actions">
            {!account ? (
              <Button
                variant="primary"
                size="lg"
                loading={connecting}
                onClick={connectWallet}
              >
                Connect Wallet
              </Button>
            ) : (
              <div className="wallet-info">
                <span className="wallet-info__role" data-role={isTeacher ? "teacher" : "student"}>
                  {isTeacher ? "Teacher" : "Student"}
                </span>
                <button
                  type="button"
                  className="wallet-info__address"
                  onClick={handleCopyAddress}
                  title="Copy address"
                >
                  {truncateAddress(account)}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        {!account ? (
          <div className="app-hero">
            <p className="app-hero__text">Connect your wallet to open or mark attendance.</p>
          </div>
        ) : (
          <>
            <nav className="app-tabs" role="tablist" aria-label="Switch between Student and Teacher">
              <button
                type="button"
                role="tab"
                aria-selected={page === "student"}
                className={`app-tab ${page === "student" ? "app-tab--active" : ""}`}
                onClick={() => setPage("student")}
              >
                Student
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={page === "teacher"}
                className={`app-tab ${page === "teacher" ? "app-tab--active" : ""}`}
                onClick={() => setPage("teacher")}
              >
                Teacher
              </button>
            </nav>

            {page === "student" && (
              <Student
                courseCode={courseCode}
                setCourseCode={setCourseCode}
                markAttendance={markAttendance}
                txPending={txPending}
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
                txPending={txPending}
              />
            )}
          </>
        )}
      </main>

      <Toast
        type={toast.type}
        message={toast.message}
        visible={toast.visible}
      />
    </>
  );
}

export default App;
