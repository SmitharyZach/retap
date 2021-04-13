import React from "react";

export default function Header({ loggedIn }) {
  const _handleClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <section
      className="hero is-small is-success"
      style={{ backgroundColor: "#f9c000" }}
    >
      <div className="hero-body">
        <div className="container">
          <p className="title" style={{ color: "black" }}>
            ReTap{" "}
            <span role="img" aria-label="beers">
              🍻
            </span>
            {loggedIn ? (
              <a
                onClick={_handleClick}
                className="button is-light is-pulled-right"
              >
                Log out
              </a>
            ) : (
              <p></p>
            )}
          </p>
          <p style={{ color: "black" }} className="subtitle">
            Look back at the glorious beers you drank on this day years ago
          </p>
        </div>
      </div>
    </section>
  );
}
