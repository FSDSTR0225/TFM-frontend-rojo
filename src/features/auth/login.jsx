
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from "react-router";
export const Login = () => {
    const { register,
        watch,
        handleSubmit,
        formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { getProfile,profile } = useContext(AuthContext);

    const loginUser = async () => {
        const resp = await getProfile(watch('email'), watch('password')); 
        console.log('Profile: ',profile);
        if (profile.role.type === 'developer') {
            navigate('/private-dev/profile');
        } else {
            navigate('/private-rec/profile');
        }
    }


    return (
        <div className="flex items-center justify-center px-4 mt-32 mb-56">
            <div className="card w-full max-w-md bg-neutral-80 shadow-2xl text-neutral-0 border-1 border-neutral-60">

                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center mb-4 mt-4">Login Account </h2>

                    <form onSubmit={handleSubmit(loginUser)} className="space-y-3">
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
                        src="/src/assets/Codepply-Logotype-gradient.svg"
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
