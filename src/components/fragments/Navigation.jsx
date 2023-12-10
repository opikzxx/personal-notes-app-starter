import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCombined } from "../../contexts/CombinedContext";
import Button from "../elements/Button";

export default function Navigation({
  user,
  logout,
  toggleLocale,
  toggleTheme,
}) {
  const { locale } = useCombined();
  return (
    <header>
      <h1>
        <Link to="/">
          {locale === "id" ? "Aplikasi Kontak" : "Contacts App"}
        </Link>
      </h1>

      <nav className="navigation">
        <ul>
          <li>
            {user ? (
              <Link to="/archives">
                {" "}
                {locale === "id" ? "Arsip" : "Archived"}
              </Link>
            ) : null}
          </li>
        </ul>
      </nav>
      <Button title="Transelate" onClick={toggleLocale} />
      <Button title="Dark" onClick={toggleTheme} />
      {user ? (
        <button className="button-logout" type="button" onClick={logout}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5a2 2 0 00-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
          </svg>
          {user?.name}
        </button>
      ) : null}
    </header>
  );
}

Navigation.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  toggleLocale: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
