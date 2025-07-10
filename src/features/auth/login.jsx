import logo from '../../assets/Codepply-Logotype-gradient.svg'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from "react-router";
import { loginUser } from '../../services/authService';
import { ForgotPasswordModal } from "./ForgotPasswordModal";

export const Login = () => {
    const { register,
        watch,
        handleSubmit,
        formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const { setToken,profile } = useContext(AuthContext);

    const login = async () => {
        const resp = await loginUser(watch('email'), watch('password'));
        localStorage.setItem('token', resp.token);
        setToken(resp.token); // Esto dispara el efecto en el contexto
    };

    const [showForgotModal, setShowForgotModal] = useState(false);

    const handleOpenModal = () => {
        setShowForgotModal(true);
    };

    // Cuando el profile se carga, redirigimos
   useEffect(() => {
    if (profile) {
        const from = location.state?.from;
        if (from) {
            navigate(from, { replace: true });
        } else if (profile.role.type === 'developer') {
            navigate(`/profile/${profile._id}`, { replace: true });
        } else {
            navigate(`/recruiter/${profile._id}`, { replace: true });
        }
    }
}, [profile]);

    return (
        <div className="flex items-center justify-center px-4 mt-32 mb-56">
            <div className="card w-full max-w-md bg-neutral-80 shadow-2xl  border-1 border-neutral-60">

                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center mb-4 mt-4">Login Account </h2>

                    <form onSubmit={handleSubmit(login)} className="space-y-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-neutral-20">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your email"
                                className="input input-bordered input-md w-full bg-neutral-60 border-neutral-50"
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'El campo es requerido'
                                    },
                                    minLength: {
                                        value: 4,
                                        message: 'El campo debe tener al menos 4 caracteres'
                                    }
                                })}
                            />
                            {
                                errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>
                            }
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-neutral-20">Password</span>
                            </label>
                            <input
                                {...register('password')}
                                type="password"
                                placeholder="Your password"
                                className="input input-bordered input-md w-full bg-neutral-60 border-neutral-50"
                            />
                        </div>
                        <div className="flex justify-end">
                          <label className="label">
                              <button
                                  type="button"
                                  onClick={handleOpenModal}
                                  className="label-text text-neutral-20 hover:underline">
                                  Forgot password?
                              </button>
                          </label>

                          <ForgotPasswordModal open={showForgotModal} setOpen={setShowForgotModal} />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-gradient-to-r from-primary-60 to-secondary-60 w-full text-lg text-neutral-0 font-semibold tracking-wide hover:bg-primary-70">
                                Log in
                            </button>
                        </div>
                    </form>



                    <p className="text-sm text-center mt-2">
                        Don't have an account yet?{' '}
                        <Link to={'/register'} className="text-primary-50 hover:underline">Sign Up</Link>
                    </p>
                    <img
                        src={logo}
                        alt="Codepply Logo"
                        className="h-6 mx-auto mt-8"
                    />
                    <small className="text-[11px] text-neutral-30 text-center block mt-1">
                        Codepply Spain ® 2025
                    </small>

                </div>
            </div>
        </div>
    );
};
