import { useForm } from "react-hook-form";
import { registeredUser } from "../../services/authService";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";
import logo from "../../assets/Codepply-Logotype-gradient.svg";

export const Register = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm();

  const registerUser = async (formData) => {
    setEmailError("");

    // Validate that passwords match
    if (formData.password !== formData["confirm-password"]) {
      setEmailError("Passwords do not match");
      return;
    }

    try {
      let newUser = { ...formData };
      const _resp = await registeredUser(newUser);
      //console.log("Registration successful:", resp);
      navigate(`/login`);
    } catch (error) {
      console.error("Registration error:", error);
      if (error.status === 409) {
        setEmailError("Email is already registered");
      } else {
        setEmailError("Error registering user");
      }
    }
  };

  return (
    <div className="flex items-center justify-center px-4 mt-24 mb-56">
      <div className="card w-full max-w-md bg-neutral-80 shadow-2xl text-neutral-0 border-1 border-neutral-60">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4 mt-4">
            Create account
          </h2>

          <form onSubmit={handleSubmit(registerUser)} className="space-y-3">
            {/* Name + Surname side by side */}
            <div className="flex gap-4">
              <div className="form-control w-2/5">
                <label className="label">
                  <span className="label-text text-neutral-20">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="input input-bordered input-md w-full bg-neutral-60 border-neutral-50"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 1,
                      message: "Name must be at least 1 character",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="form-control w-3/5">
                <label className="label">
                  <span className="label-text text-neutral-20">Surname</span>
                </label>
                <input
                  type="text"
                  placeholder="Your surname"
                  className="input input-bordered input-md w-full bg-neutral-60 border-neutral-50"
                  {...register("surname", {
                    required: "Surname is required",
                    minLength: {
                      value: 1,
                      message: "Surname must be at least 1 character",
                    },
                  })}
                />
                {errors.surname && (
                  <p className="text-red-500 text-sm">
                    {errors.surname.message}
                  </p>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-20">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered input-md w-full bg-neutral-60 border-neutral-50"
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 4,
                    message: "Email must be at least 4 characters",
                  },
                })}
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-20">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your password"
                className="input input-bordered input-md w-full bg-neutral-60 border-neutral-50"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  validate: (value) => {
                    const regex =
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/;
                    return (
                      regex.test(value) ||
                      "Password must include uppercase, lowercase, number and special character"
                    );
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-20">
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="input input-bordered input-md w-full bg-neutral-60 border-neutral-50"
                {...register("confirm-password", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors["confirm-password"] &&
                touchedFields["confirm-password"] && (
                  <p className="text-red-500 text-sm">
                    {errors["confirm-password"].message}
                  </p>
                )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-20">Role</span>
              </label>
              <select
                {...register("role")}
                className="input input-bordered input-md w-full bg-neutral-60 border-neutral-50"
              >
                <option value="developer">Developer</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-gradient-to-r from-primary-50 to-secondary-60 w-full text-lg text-neutral-0 font-semibold tracking-wide hover:bg-primary-70">
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to={"/login"} className="text-primary-50 hover:underline">
              Log in
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
