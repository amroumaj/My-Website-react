import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import about from "./pages/about";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" elment={<about />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
       
        <Footer />
    </div>
  );
}

export default App;

