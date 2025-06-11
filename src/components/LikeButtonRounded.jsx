import React, { useState, useEffect } from "react";
import { PiHeartStraight, PiHeartStraightFill } from "react-icons/pi";
import { toggleProjectLike, getProjectLikeStatus } from "../services/projectService";
import "../animations/LikeButtonRounded.css";

export function LikeButtonRounded({ projectId, token, onLike }) {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(true); // comienza cargando

  // Al cargar el componente, consultamos si el proyecto ya fue likeado
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const data = await getProjectLikeStatus(projectId, token); // 👈 nueva función
        setLiked(data.liked);
      } catch (error) {
        console.error("Error al obtener el estado del like:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikeStatus();
  }, [projectId, token]);

  const handleClick = async () => {
    if (animating || loading) return;
    setAnimating(true);
    setLoading(true);

    try {
      const data = await toggleProjectLike(projectId, token);
      setLiked(data.liked);
      if (onLike) onLike(data);
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
      disabled={loading}
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
