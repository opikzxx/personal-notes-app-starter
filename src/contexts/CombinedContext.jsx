import React, { createContext, useContext, useState } from "react";

const CombinedContext = createContext();

const CombinedProvider = ({ children }) => {
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "id");
  const [isDarkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "dark");

  const toggleLocale = () => {
    const newLocale = locale === "id" ? "en" : "id";
    localStorage.setItem("locale", newLocale);
    setLocale(newLocale);
  };

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    localStorage.setItem("darkMode", newDarkMode ? "dark" : "light");
    setDarkMode(newDarkMode);
  };

  const contextValue = {
    locale,
    toggleLocale,
    isDarkMode,
    toggleTheme,
  };

  return (
    <CombinedContext.Provider value={contextValue}>
      {children}
    </CombinedContext.Provider>
  );
};

const useCombined = () => {
  const context = useContext(CombinedContext);
  if (!context) {
    throw new Error("useCombined must be used within a CombinedProvider");
  }
  return context;
};

export { CombinedProvider, useCombined };
