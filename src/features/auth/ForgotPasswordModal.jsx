import { useState } from "react";
import { forgotPassword } from "../../services/authService";

export const ForgotPasswordModal = ({ open, setOpen }) => {
  
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setEmail("");
    setMessage("");
    setOpen(false);
  };

  const handleSendEmail = async () => {
    if (!email.trim()) {
      setMessage("Please, add your email");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      //console.log(email)
      const res = await forgotPassword(email);
      setMessage(res.message || "Mail Send. Check your inbox.");
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error("Error sending email", error?.message);
      setMessage(error?.message || "Error sending email");
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal modal-open fixed inset-0 flex justify-center items-center z-50 ">
      <div className="modal-box max-w-md bg-neutral-80 p-6 relative">
        <h2 className="text-2xl font-bold text-center">Recover password</h2>

        <div className="form-control">
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input input-bordered w-full bg-neutral-60"
            required
          />
        </div>

        {message && (
          <p className="text-sm text-start text-secondary-60">{message}</p>
        )}

        <div className="flex justify-end gap-4 pt-4">
          <button
            onClick={handleSendEmail}
            className="btn bg-primary-60 text-neutral-10 hover:bg-primary-70 w-full md:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send link"}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="btn bg-neutral-70 text-neutral-10 hover:bg-neutral-60 border border-neutral-60 w-full md:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
