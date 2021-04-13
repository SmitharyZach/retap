import React from "react";

export default function Footer() {
  return (
    <div className="footer" style={{ marginBottom: "0rem" }}>
      <div className="content has-text-centered">
        <strong>Tasting Notes:</strong>
        <p>
          Earthy, nutty, piney. Loads of citrus and grapefuit. Brewed by{" "}
          <a href="https://github.com/SmitharyZach">Zach Smith</a>. Inspired by{" "}
          <a href="https://gregavola.com/">Greg Avola</a> and the now defunct
          BeerMemories project.
        </p>
      </div>
    </div>
  );
}
