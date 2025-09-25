import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Tours from "./pages/Tours";
import Bookings from "./pages/Bookings";
import Conservation from "./pages/Conservation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/conservation" element={<Conservation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
