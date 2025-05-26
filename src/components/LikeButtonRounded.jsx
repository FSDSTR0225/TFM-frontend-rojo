import React, { useState } from "react";
import { PiHeartStraight, PiHeartStraightFill } from "react-icons/pi";
import "../animations/LikeButtonRounded.css";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    if (animating) return;
    setAnimating(true);
    setLiked(!liked);
    // Animación dura 600ms (encogimiento + rebote + partículas)
    setTimeout(() => setAnimating(false), 600);
  };

  return (
    <button
      onClick={handleClick}
      className={`like-button rounded-full flex items-center justify-center relative
        ${liked ? "liked" : ""} ${animating ? "animating" : ""}`}
      aria-label={liked ? "Unlike project" : "Like project"}
      type="button"
    >
      {liked ? (
        <PiHeartStraightFill size={32} weight="fill" className="icon" />
      ) : (
        <PiHeartStraight size={32} weight="regular" className="icon" />
      )}

      {/* Partículas que salen alrededor cuando animating */}
      {animating && liked && (
        <div className="particles">
          {[...Array(8)].map((_, i) => (
            <span key={i} className={`particle particle-${i + 1}`} />
          ))}
        </div>
      )}
    </button>
  );
}
