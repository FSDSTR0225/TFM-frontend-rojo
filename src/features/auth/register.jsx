import { useForm } from 'react-hook-form';
import { registeredUser } from '../../services/authService';
import { Link } from 'react-router';
import { useNavigate } from "react-router";
import logo from '../../assets/codepply-Logotype-gradient.svg'

export const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const registerUser = async (formDatos) => {
    let newUser = { ...formDatos };
    const resp = await registeredUser(newUser);
    if (resp) {
      console.log('holaaa: ', resp);
    }
    navigate(`/login`);
  };

  return (
    <div className="flex items-center justify-center px-4 mt-24 mb-56">
      <div className="card w-full max-w-md bg-neutral-80 shadow-2xl text-neutral-0 border-1 border-neutral-60">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4 mt-4">Create account</h2>

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
                  {...register('name', {
                    required: { value: true, message: 'El campo es requerido' },
                    minLength: { value: 4, message: 'El campo debe tener al menos 4 caracteres' }
                  })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="form-control w-3/5">
                <label className="label">
                  <span className="label-text text-neutral-20">Surname</span>
                </label>
                <input
                  type="text"
                  placeholder="Your surname"
                  className="input input-bordered input-md w-full bg-neutral-60 border-neutral-50"
                  {...register('surname', {
                    required: { value: true, message: 'El campo es requerido' },
                    minLength: { value: 4, message: 'El campo debe tener al menos 4 caracteres' },
                    maxLength: { value: 10, message: 'El campo debe tener máximo 10 caracteres' }
                  })}
                />
                {errors.surname && <p className="text-red-500 text-sm">{errors.surname.message}</p>}
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
                {...register('email', {
                  required: { value: true, message: 'El campo es requerido' },
                  minLength: { value: 4, message: 'El campo debe tener al menos 4 caracteres' }
                })}
              />
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

            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-20">Confirm Password</span>
              </label>
              <input
                {...register('confirm-password')}
                type="password"
                placeholder="Confirm your password"
                className="input input-bordered input-md w-full bg-neutral-60 border-neutral-50"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-20">Role</span>
              </label>
              <select
                {...register('role')}
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
            Already have an account?{' '}
            <Link to={'/login'} className="text-primary-50 hover:underline">Log in</Link>
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
