import logo from "../../assets/Codepply-Logotype-gradient.svg";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import { loginUser } from "../../services/authService";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

export const Login = () => {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, profile } = useContext(AuthContext);

  const [loginError, setLoginError] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);

  const email = watch("email");
  const password = watch("password");

  const login = async () => {
    setLoginError("");

    let hasEmpty = false;
    if (!email) {
      setError("email", {
        type: "required",
        message: "Este campo es requerido",
      });
      hasEmpty = true;
    }
    if (!password) {
      setError("password", {
        type: "required",
        message: "This field is required",
      });
      hasEmpty = true;
    }

    if (hasEmpty) return;

    try {
      const resp = await loginUser(email, password);
      localStorage.setItem("token", resp.token);
      setToken(resp.token);
      setLoginError("");
    } catch {
      setLoginError("Incorrect email or password");
    }
  };

  const handleOpenModal = () => {
    setShowForgotModal(true);
  };

  useEffect(() => {
    if (email) clearErrors("email");
    if (password) clearErrors("password");
    if (email || password) setLoginError("");
  }, [email, password, clearErrors, setLoginError]);

  useEffect(() => {
    if (!profile) return;

    const from = location.state?.from;
    if (from) {
      navigate(from, { replace: true });
    } else if (profile?.role?.type === "developer") {
      navigate(`/profile/${profile._id}`, { replace: true });
    } else {
      navigate(`/recruiter/${profile._id}`, { replace: true });
    }
  }, [profile, location, navigate]);

  const hasLoginError = loginError !== "";

  return (
    <div className="flex items-center justify-center px-4 mt-32 mb-56">
      <div className="card w-full max-w-md bg-neutral-80 shadow-2xl border-1 border-neutral-60">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4 mt-4">
            Login Account
          </h2>

          <form onSubmit={handleSubmit(login)} className="space-y-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-20">Email</span>
              </label>
              <input
                type="text"
                placeholder="Your email"
                className={`input input-bordered input-md w-full bg-neutral-60 ${
                  errors.email || hasLoginError
                    ? "border-red-500"
                    : "border-neutral-50"
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-20">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your password"
                className={`input input-bordered input-md w-full bg-neutral-60 ${
                  errors.password || hasLoginError
                    ? "border-red-500"
                    : "border-neutral-50"
                }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {hasLoginError && (
              <p className="text-sm text-red-500 text-left mt-2">
                {loginError}
              </p>
            )}

            <div className="form-control mt-6">
              <button className="btn bg-gradient-to-r from-primary-60 to-secondary-60 w-full text-lg text-neutral-0 font-semibold tracking-wide hover:bg-primary-70">
                Log in
              </button>
            </div>
          </form>

          <div className="flex justify-center mt-2">
            <label className="label text-neutral-0">
              Forgot password?
              <button
                type="button"
                onClick={handleOpenModal}
                className="text-secondary-30 hover:underline"
              >
                Click here
              </button>
            </label>
            <ForgotPasswordModal
              open={showForgotModal}
              setOpen={setShowForgotModal}
            />
          </div>

          <p className="text-sm text-center">
            Don't have an account yet?{" "}
            <Link to={"/register"} className="text-primary-50 hover:underline">
              Sign Up
            </Link>
          </p>
          <img src={logo} alt="Codepply Logo" className="h-6 mx-auto mt-8" />
          <small className="text-[11px] text-neutral-30 text-center block mt-1">
            Codepply Spain ® 2025
          </small>
        </div>
      </div>
    </div>
  );
};
