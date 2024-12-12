import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UserRoutes from "./routers/userRouter";
import AuthRoutes from "./routers/AuthRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="auth/*" element={<AuthRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
