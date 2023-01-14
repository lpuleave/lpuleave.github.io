import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LeaveForm from "./Components/LeaveForm/LeaveForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LeaveForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
