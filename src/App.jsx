import User from "./user";
import Edit from "./edit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
     <Router>
      <Routes>
      <Route path="/" element={<User />}  />

        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
      </Router>
   
  );
};

export default App;
