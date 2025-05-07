import { useForm } from 'react-hook-form';
import { registeredUser } from '../../services/authService';
import { Link } from 'react-router';
import { useNavigate } from "react-router";
export const Register = () => {
  const navigate = useNavigate();
  const { register,
    watch,
    handleSubmit,
    formState: { errors } } = useForm();

  const registerUser = async (formDatos) => {
    let newUser = { ...formDatos };
    const resp = await registeredUser(newUser);
    if (resp) {
      console.log('holaaa: ', resp);
    }
    navigate(`/login`);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-300 shadow-2xl text-base-content">
        <div className="card-body">
          <h2 className="text-3xl font-extrabold text-center mb-4">Create Account <span className="text-green-500">Codepply</span></h2>

          <form onSubmit={handleSubmit(registerUser)} className="space-y-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="input input-bordered input-md w-full bg-base-100"
                {...register('name', {
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
                <span className="label-text">Surname</span>
              </label>
              <input
                type="text"
                placeholder="Your surname"
                className="input input-bordered input-md w-full bg-base-100"
                {...register('surname', {
                  required: {
                    value: true,
                    message: 'El campo es requerido'
                  },
                  minLength: {
                    value: 4,
                    message: 'El campo debe tener al menos 4 caracteres'
                  },
                  maxLength: {
                    value: 10,
                    message: 'El campo debe tener maximo 10 caracteres'
                  }
                })}
              />
              {
                errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>
              }
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered input-md w-full bg-base-100"
                {...register('email',{
                  required:{
                    value:true,
                    message:'El campo es requerido'
                  },
                  minLength:{
                    value:4,
                    message:'El campo debe tener al menos 4 caracteres'
                  }
                })}
              />
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

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                {...register('confirm-password')}
                type="password"
                placeholder="Confirm your password"
                className="input input-bordered input-md w-full bg-base-100"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                {...register('role')}
                className="select select-bordered w-full bg-base-100"
              >
                <option value="developer">Developer</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-green-600 w-full text-base font-semibold tracking-wide">
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <Link to={'/login'} className="text-green-500 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
