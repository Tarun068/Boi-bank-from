import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BoiForm from "./pages/BoiForm";
import CbiForm from "./pages/CbiForm";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BoiForm />} />
          <Route path="/cbi" element={<CbiForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
