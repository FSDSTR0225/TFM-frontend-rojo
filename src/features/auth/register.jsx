import { useForm } from 'react-hook-form';
import { registeredUser } from '../../services/authService';
export const Register = () => {

  const {register,
    watch,
    handleSubmit,
    formState:{errors}}=useForm();

  const registerUser = async (formDatos)=>{
    let newUser = {...formDatos};
    const resp = await registeredUser(newUser);
    if(resp){
      console.log('holaaa: ',resp );
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit(registerUser)}>
          <div>
            <label className="block text-sm font-medium text-gray-900">Name</label>
            <input
              {...register('name')}
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring focus:ring-blue-300 focus:outline-none text-gray-900"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Email</label>
            <input
             {...register('email')}
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring focus:ring-blue-300 focus:outline-none text-gray-900"
              placeholder="Your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              {...register('password')}
              id="password"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring focus:ring-blue-300 focus:outline-none text-gray-900"
              placeholder="Your password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Confirm Password</label>
            <input
              type="password"
              {...register('confirm-password')}
              id="confirm-password"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring focus:ring-blue-300 focus:outline-none text-gray-900"
              placeholder="Confirm your password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Role</label>
            <select
              id="rol"
              {...register('role')}
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring focus:ring-blue-300 focus:outline-none text-gray-900"
            >
              <option value="developer">Developer</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-900">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};
