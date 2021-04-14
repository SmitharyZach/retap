import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import Checkin from "./Checkin";
import axios from "axios";
require("dotenv").config();
const clientId = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;
const { DateTime } = require("luxon");
let detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

if (detectedTimeZone === undefined || detectedTimeZone === null) {
  detectedTimeZone = "America/New_York";
}

export default function Dashboard({ code }) {
  console.log("timezone from app", detectedTimeZone);
  const accessToken = useAuth(code);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [checkins, setCheckins] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(
    "Cleaning the tap lines..."
  );
  var allCheckins = [];

  const loadingMessages = [
    "Sanitizing the bottle caps...",
    "Waiting on secondary fermentation...",
    "Checking the best by date...",
    "Stocking the cooler...",
    "Recycling the cans...",
    "Adding hops to the wort...",
    "Cracking a few cold ones...",
    "Boiling the wort...",
    "Checking the grist bill...",
    "Pitching the yeast...",
    "Measuring the gravity...",
    "Writing the recipe...",
    "Apologizing to Brian for the wait times...",
  ];

  // use effect to get user info

  const getAllCheckins = (maxId) => {
    let localStorageCheckins = localStorage.getItem("checkins");

    if (localStorageCheckins === null) {
      axios
        .get(`https://api.untappd.com/v4/user/checkins`, {
          params: {
            access_token: accessToken,
            limit: 100,
            max_id: maxId,
          },
        })
        .then((res) => {
          res.data.response.checkins.items.forEach((item) => {
            allCheckins.push(item);
          });
          return (maxId = res.data.response.pagination.max_id);
        })
        .then((maxId) => {
          if (maxId > 0) {
            let message =
              loadingMessages[
                Math.floor(Math.random() * loadingMessages.length)
              ];
            setLoadingMessage(message);
            getAllCheckins(maxId);
          } else {
            setCheckins(allCheckins);
            setUsername(allCheckins[0].user.user_name);
            setIsLoading(false);
            localStorage.setItem("checkins", JSON.stringify(allCheckins));
          }
        })
        .catch((err) => {
          setCheckins(allCheckins);
          if (allCheckins.length != 0) {
            setUsername(allCheckins[0].user.user_name);
          }
          setIsLoading(false);
          localStorage.setItem("checkins", JSON.stringify(allCheckins));
          return;
        });
    } else {
      let retrievedCheckins = JSON.parse(localStorageCheckins);
      if (allCheckins.length != 0) {
        setUsername(allCheckins[0].user.user_name);
      }
      setCheckins(retrievedCheckins);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let localStorageCheckins = localStorage.getItem("checkins");
    if (!accessToken && localStorageCheckins === null) return;
    getAllCheckins();
  }, [accessToken]);

  const getPastDate = (years) => {
    let date = DateTime.local()
      .setZone(detectedTimeZone)
      .minus({ years: years })
      .toFormat("ccc, dd LLL yyyy");
    return date;
  };

  const filterByYear = (message, years) => {
    const date = getPastDate(years);
    const filteredCheckins = checkins.filter((checkin) => {
      let checkinDate = DateTime.fromRFC2822(checkin.created_at, {
        zone: detectedTimeZone,
      });
      let formattedCheckinDate = checkinDate.toFormat("ccc, dd LLL yyyy");
      return formattedCheckinDate.includes(date);
    });
    if (filteredCheckins.length === 0) {
      return false;
    }
    return (
      <div className="container is-max-widescreen">
        <div className="section" style={{ paddingBottom: "5px" }}>
          <section
            className="hero is-small"
            style={{
              backgroundColor: "#f9c000",
              borderRadius: "3px",
            }}
          >
            <div className="hero-body has-text-centered">
              <h5 className="title is-5">{message}</h5>
            </div>
          </section>
        </div>
        <div className="section">
          {filteredCheckins.map((checkin) => (
            <Checkin
              key={checkin.checkin_id}
              checkin={checkin}
              detectedTimeZone={detectedTimeZone}
              year={years}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {isLoading ? (
        <div className="columns is-centered is-vcentered">
          <div className="column has-text-centered is-4 box">
            <h1>{loadingMessage}</h1>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="section"
            style={{ paddingBottom: "0rem", paddingTop: "0rem" }}
          >
            <div className="container">
              <div className="columns is-centered">
                <div className="column has-text-centered is-8">
                  <h1 className="title">Cheers {username}!</h1>
                </div>
              </div>
            </div>
          </div>
          {filterByYear("One year ago", 1)}
          {filterByYear("Two years ago", 2)}
          {filterByYear("Three years ago", 3)}
          {filterByYear("Four years ago", 4)}
          {filterByYear("Five years ago", 5)}
          {filterByYear("Six years ago", 6)}
          {filterByYear("Seven years ago", 7)}
          {filterByYear("Eight years ago", 8)}
          {filterByYear("Nine years ago", 9)}
          {filterByYear("Ten years ago", 10)}
          {filterByYear("Eleven years ago", 11)}
          {filterByYear("Twelve years ago", 12)}
          {!filterByYear("one years ago", 1) &&
          !filterByYear("two years ago", 2) &&
          !filterByYear("three years ago", 3) &&
          !filterByYear("four years ago", 4) &&
          !filterByYear("five years ago", 5) &&
          !filterByYear("six years ago", 6) &&
          !filterByYear("seven years ago", 7) &&
          !filterByYear("eight years ago", 8) &&
          !filterByYear("nine years ago", 9) &&
          !filterByYear("ten years ago", 10) &&
          !filterByYear("twelve years ago", 12) &&
          !filterByYear("eleven years ago", 11) ? (
            <div className="section">
              <div className="columns is-centered">
                <div className="column has-text-centered is-4 box">
                  <h1>
                    You were a sober soul on this date. No beers where checked
                    in on this date in the past!
                  </h1>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}
