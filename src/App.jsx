import "./App.css";
import "./fonts/marvel-2.woff2";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
// PAGES
import Characters from "./pages/Characters/Characters";
import Character from "./pages/Character/Character";
import Comics from "./pages/Comics/Comics";
import Home from "./pages/Home/Home";
import Signup from "./pages/Login-Signup/Signup";
import Login from "./pages/Login-Signup/Login";

// COMPONENTS
import Header from "./components/header/Header";

function App() {
  const [token, setToken] = useState(Cookies.get("marvelToken") || null);
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("marvelToken", token, { expires: 7, sameSite: "Strict" });
    } else {
      setToken(null);
      Cookies.remove("marvelToken");
    }
  };
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:characterId" element={<Character />} />
        <Route path="/comics" element={<Comics />} />
      </Routes>
    </Router>
  );
}

export default App;
