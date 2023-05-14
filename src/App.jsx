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
import Favorites from "./pages/Favorites/Favorites";
import Signup from "./pages/Login-Signup/Signup";
import Login from "./pages/Login-Signup/Login";

// COMPONENTS
import Header from "./components/header/Header";

function App() {
  const [token, setToken] = useState(Cookies.get("marvelToken") || null);
  const [favorites, setFavorites] = useState(
    Cookies.get("marvelFavorites") || []
  );

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("marvelToken", token, { expires: 7, sameSite: "Strict" });
    } else {
      setToken(null);
      Cookies.remove("marvelToken");
    }
  };

  const handleFavorites = (favorites) => {
    setFavorites(favorites);
    Cookies.set("marvelFavorites", favorites, {
      expires: 7,
      sameSite: "Strict",
    });
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route
          path="/characters"
          element={
            <Characters
              handleToken={handleToken}
              handleFavorites={handleFavorites}
              favorites={favorites}
            />
          }
        />
        <Route path="/character/:characterId" element={<Character />} />
        <Route
          path="/comics"
          element={
            <Comics
              handleToken={handleToken}
              handleFavorites={handleFavorites}
              favorites={favorites}
            />
          }
        />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
