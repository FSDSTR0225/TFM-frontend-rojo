import React from "react";
import { PiHeartStraight, PiHeartStraightFill } from "react-icons/pi";
import "../animations/LikeButtonRounded.css";

export const LikeButtonRounded = ({
  liked,
  animating,
  loadingLike,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`like-button rounded-full flex items-center justify-center relative ${
        liked ? "liked" : ""
      } ${animating ? "animating" : ""}`}
      aria-label={liked ? "Unlike project" : "Like project"}
      type="button"
      disabled={loadingLike}
    >
      {liked ? (
        <PiHeartStraightFill size={32} weight="fill" className="icon" />
      ) : (
        <PiHeartStraight size={32} weight="regular" className="icon" />
      )}

      {animating && liked && (
        <div className="particles">
          {[...Array(8)].map((_, i) => (
            <span key={i} className={`particle particle-${i + 1}`} />
          ))}
        </div>
      )}
    </button>
  );
};