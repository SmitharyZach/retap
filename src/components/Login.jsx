import React from "react";
require("dotenv").config();

const clientId = process.env.REACT_APP_CLIENTID;

const AUTH_URL = `https://untappd.com/oauth/authenticate/?client_id=${clientId}&response_type=code&redirect_url=https://retap.herokuapp.com/`;

export default function Login() {
  return (
    <div
      style={{
        paddingTop: "5rem",
        paddingBottom: "5rem",
        backgroundColor: "white",
      }}
    >
      <div className="columns is-centered">
        <div className="column has-text-centered is-4">
          <a
            className="button is-primary is-large"
            style={{ backgroundColor: "#f9d000" }}
            href={AUTH_URL}
          >
            Login with Untappd
          </a>
        </div>
      </div>
    </div>
  );
}
