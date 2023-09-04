import { BrowserRouter as Router,  Routes } from "react-router-dom";
import User from "./user";
// import Edit from "../edit";
const App = () => {
  return (
    <Router>
      <User />
      <Routes>
        {/* <Route path="/edit" element={<Edit />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
