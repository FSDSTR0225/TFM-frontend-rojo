import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
export const Login = () => {
    const { register,
        watch,
        handleSubmit,
        formState: { errors } } = useForm();

    const login = (formDatos) =>{
        console.log('datos form: ',formDatos);
    }
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-300 shadow-2xl text-base-content">
        <div className="card-body">
          <h2 className="text-3xl font-extrabold text-center mb-4">Login Account <span className="text-green-500">Codepply</span></h2>

          <form onSubmit={handleSubmit(login)} className="space-y-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Your email"
                className="input input-bordered input-md w-full bg-base-100"
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
                <span className="label-text">Password</span>
              </label>
              <input
                {...register('password')}
                type="password"
                placeholder="Your password"
                className="input input-bordered input-md w-full bg-base-100"
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-green-600 w-full text-base font-semibold tracking-wide">
                Log in
              </button>
            </div>
          </form>

          <p className="text-sm text-center mt-4">
            Created here
            <Link to={'/register'} className="text-green-500 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
