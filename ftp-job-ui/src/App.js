import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobForm from "./components/JobForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobForm />} />
        {/* Future: <Route path="/jobs" element={<JobList />} /> */}
      </Routes>
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;