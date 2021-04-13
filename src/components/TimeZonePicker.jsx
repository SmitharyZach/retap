import React from "react";

export default function TimeZonePicker({ detectedTimeZone }) {
  return (
    <div className="columns is-centered">
      <div className="column is-half has-text-centered">
        <p>Please select your time zone before logging in</p>
        <div className="select">
          <select>
            <option>{detectedTimeZone}</option>
            <option>select 2</option>
          </select>
        </div>
      </div>
    </div>
  );
}
