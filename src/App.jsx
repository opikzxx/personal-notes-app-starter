import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/fragments/Navigation";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import { useCombined } from "./contexts/CombinedContext";
import Home from "./pages/Home";
import AddNotes from "./pages/AddNotes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DetailNotes from "./pages/DetailNotes";
import Archives from "./pages/Archives";

const App = () => {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const { isDarkMode, toggleTheme, toggleLocale } = useCombined();


  const onLoginSuccess = async (accessToken) => {
    try {
      putAccessToken(accessToken);
      const { data, error } = await getUserLogged();

      if (!error) {
        setAuthedUser(data);
      } else {
        console.error("Error fetching user data:", error);
      }
    } catch (error) {
      console.error("Login success handling failed:", error);
    }
  };

  const onLogout = () => {
    try {
      putAccessToken("");
      setAuthedUser(null);
    } catch (error) {
      console.error("Logout handling failed:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUserLogged();
        setAuthedUser(data);
        setInitializing(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setInitializing(false);
      }
    };

    if (authedUser === null) {
      fetchData();
    } 
  }, [authedUser]);

  if (initializing) {
    return null;
  }

  return (
    
      <div
        className="app-container"
        data-theme={`${isDarkMode ? "dark" : "light"}`}
      >
        <Navigation
          user={authedUser}
          logout={onLogout}
          toggleTheme={toggleTheme}
          toggleLocale={toggleLocale}
        />
        <main>
          <Routes>
            {authedUser === null ? (
              <>
                <Route
                  path="/*"
                  element={<Login loginSuccess={onLoginSuccess} />}
                />
                <Route path="/register" element={<Register />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/notes/new" element={<AddNotes />} />
                <Route path="/archives" element={<Archives />} />
                <Route path="/notes/:id" element={<DetailNotes />} />
              </>
            )}
          </Routes>
        </main>
      </div>
  );
};

export default App;
