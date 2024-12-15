import React from 'react';
import { useForm } from 'react-hook-form';
import { register as RegisterForm } from '../fields/register.json'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import Loading from '../components/loading';

interface RegisterFormData {
  profileImage: string;
  userName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  occupation: string;
  bloodGroup: string
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>({
    defaultValues: {
      profileImage: "https://img.freepik.com/free-vector/young-man-with-glasses-avatar_1308-173760.jpg?t=st=1734263725~exp=1734267325~hmac=ce2bdbedfe6889198481ef78f8f7fe09493c06c9368ea08171788dd609d9184d&w=740",
      occupation: '',
      bloodGroup: '',
      userName: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });
  const navigate = useNavigate()
  const { registerUser, loading, success, error } = useAuth()

  const onSubmit = async (data: RegisterFormData) => {
    await registerUser(data)
  };

  // Watch the password field to validate confirmPassword
  const password = watch("password");

  if (success) {
    toast.success(success.message, { position: 'bottom-center' })
    setTimeout(() => {
      navigate('/verify-otp')
    }, 1000)
  }
  if (error) {
    toast.error(error, { position: 'bottom-center' })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-lamaPurpleLight p-6">
      {loading && <Loading />}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-6">
        <div className='flex items-center justify-center gap-2 mb-2'>
          <img src="./logo_image.png" alt='logo' width={50} height={50} />
          <div>
            <h3 className='font-extrabold'>Bansawoli</h3>
            <h4 className='font-semibold'>Register</h4>
          </div>
        </div>
        {RegisterForm.map(item => (
          <div key={item.name}>
            <label htmlFor={`${item.name}`} className="block text-sm font-medium text-gray-700">{item.label}</label>
            <input
              id={`${item.name}`}
              placeholder={item.placeholder}
              type={item.type}
              {...register(item.name, item.validation)}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[item.name] ? 'border-red-500' : ''}`}
            />
            {errors[item.name] && <p className="text-red-500 text-sm">{errors[item.name]?.message}</p>}
          </div>
        ))
        }
        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none">
          Register
        </button>

        <div className='text-center'>
          <p>Have a account?
            <Link to='/'>
              <span className='text-cyan-400 underline cursor-pointer'> Login</span>
            </Link>
          </p>
        </div>
      </form >
    </div >
  );
};

export default Register;
