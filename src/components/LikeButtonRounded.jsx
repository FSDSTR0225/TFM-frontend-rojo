import React, { useState, useEffect } from "react";
import { PiHeartStraight, PiHeartStraightFill } from "react-icons/pi";
import { toggleProjectLike } from "../services/projectService";
import "../animations/LikeButtonRounded.css";

export function LikeButtonRounded({ projectId, initialLiked, token, onLike }) {
  const [liked, setLiked] = useState(initialLiked);
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  const handleClick = async () => {
    if (animating || loading) return;
    setAnimating(true);
    setLoading(true);

    try {
      // toggleProjectLike retorna { liked, likesCount, ... }
      const data = await toggleProjectLike(projectId, token);

      setLiked(data.liked);

      // Avisamos al padre que actualice el proyecto completo
      if (onLike) {
        onLike(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAnimating(false);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`like-button rounded-full flex items-center justify-center relative ${liked ? "liked" : ""} ${animating ? "animating" : ""}`}
      aria-label={liked ? "Unlike project" : "Like project"}
      type="button"
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
}
