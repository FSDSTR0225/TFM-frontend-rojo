import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { resetPassword } from "../../services/authService";

export const ResetPassword = () => {

const { token } = useParams();
const navigate = useNavigate();

const [password, setPassword] = useState("");
const [message, setMessage] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
        const res = await resetPassword(token, password);
        setMessage(res.msg || "Password updated successfully.");
        setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
        setMessage(err.message);
    } finally {
        setIsSubmitting(false);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-90 px-4">
      <div className="bg-neutral-80 shadow-lg rounded-lg p-8 max-w-md w-full border-1 border-neutral-60">
        <h2 className="text-2xl font-bold text-center mb-4">
          Reset your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full bg-neutral-80"
          />

          <button
            type="submit"
            className="btn bg-primary-60 hover:bg-primary-70 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Change password"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-primary-60">{message}</p>
        )}
      </div>
    </div>
  );
}
