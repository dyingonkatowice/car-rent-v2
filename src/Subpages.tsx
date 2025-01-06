// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./App"; // Your homepage component
import AdminPage from "./Admin"; // Your admin component

const Subpages = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default Subpages;
