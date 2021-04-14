import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
const { DateTime } = require("luxon");

export default function Checkin(props) {
  let detectedTimeZone = props.detectedTimeZone;
  let checkin = props.checkin;
  let badges = props.checkin.badges;
  let beer = props.checkin.beer;
  let brewery = props.checkin.brewery;
  let media = props.checkin.media;
  let venue = props.checkin.venue;
  let createdAt = props.checkin.created_at;
  let convertedCreatedAt = DateTime.fromRFC2822(createdAt, {
    zone: detectedTimeZone,
  });
  let formattedDate = convertedCreatedAt
    .setZone(detectedTimeZone)
    .toLocaleString(DateTime.DATETIME_SHORT);

  const showBadges = () => {
    if (badges.count === 0) {
      return;
    }
    return (
      <div className="column is-one-third">
        <h5 className="title is-5" style={{ marginBottom: "1rem" }}>
          Badges
        </h5>

        {badges.items.map((badge) => {
          return (
            <div key={badge.badge_id} className="media">
              <figure className="media-left">
                <p className="image is-32x32">
                  <img src={badge.badge_image.sm} alt={badge.badge_name} />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>{badge.badge_name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const showComment = () => {
    if (checkin.checkin_comment) {
      return (
        <>
          <b>Comment:</b> {checkin.checkin_comment}
        </>
      );
    }
  };

  const showPicture = () => {
    if (media.count === 0) {
      return;
    }
    return (
      <div className="column is-one-third">
        <figure className="image is-1by1">
          <img
            src={media.items[0].photo.photo_img_md}
            alt="Checkin photo"
          ></img>
        </figure>
      </div>
    );
  };

  const showRating = () => {
    if (checkin.rating_score === 0) {
      return;
    }
    return (
      <p style={{ marginBottom: "0rem" }}>
        <b>Rating: </b>
        {checkin.rating_score} Bottle Caps
      </p>
    );
  };

  const showVenue = () => {
    if (
      venue === [] ||
      venue === undefined ||
      venue === null ||
      venue.length === 0
    ) {
      return;
    }
    return (
      <div className="media">
        <figure className="media-left">
          <p className="image is-32x32">
            <img src={venue.venue_icon.sm} alt={venue.venue_name} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>{venue.venue_name}</p>
            <p>
              {venue.location.venue_address}, {venue.location.venue_city}{" "}
              {venue.location.venue_state}
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="box" style={{ marginBottom: "3rem" }}>
      <div className="columns">
        <div className="column is-4">
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src={beer.beer_label} alt={beer.beer_name} />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <strong>{beer.beer_name}</strong>
                <p style={{ marginBottom: "0rem" }}>{brewery.brewery_name}</p>
                <p style={{ marginBottom: "0rem" }}>{beer.beer_style}</p>
                {showRating()}
                <p>{showComment()}</p>
              </div>
              <div className="media">
                <figure className="media-left">
                  <span className="icon">
                    <i className="fas fa-calendar-day"></i>
                  </span>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p>{formattedDate}</p>
                  </div>
                </div>
              </div>
              {showVenue()}
            </div>
          </article>
        </div>
        {showBadges()}
        {showPicture()}
      </div>
      <div className="is-flex is-flex-direction-row-reverse">
        <FacebookShareButton
          url={"https://retap.herokuapp.com/"}
          quote={`Was drinking a ${beer.beer_name} ${props.year} ago today!`}
          hashtag="#retap"
          style={{
            paddingLeft: "10px",
          }}
        >
          {" "}
          <FacebookIcon size={32} round />{" "}
        </FacebookShareButton>

        <TwitterShareButton
          url={"https://retap.herokuapp.com/"}
          title={`Was drinking a ${beer.beer_name} ${props.year} ago today!`}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
    </div>
  );
}
