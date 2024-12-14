/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { fields } from '../fields/login.json'
import { useForm, FieldValues } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import Loading from '../components/loading';
import { Link, useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const navigate = useNavigate()
  const { login, success, loading, error } = useAuth()
  const onSubmit = async (data: FieldValues) => {
    await login(data.phoneNumber, data.password)
  };
  if (success) {
    toast.success(success.message, { position: 'bottom-center' })
    setTimeout(() => {
      navigate('/dashboard')
    }, 1000)
  }
  if (error) {
    toast.error(error, { position: 'bottom-center' })
  }
  return (
    <div className="min-h-screen flex relative">
      {loading && <Loading />}
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white border-2 border-blue-400 rounded px-8 pt-6 pb-8 w-full max-w-md">
          <div className='flex items-center justify-center gap-2 mb-2'>
            <img src="./logo_image.png" alt='logo' width={50} height={50} />
            <div>
              <h3 className='font-extrabold'>Bansawoli</h3>
              <h4 className='font-semibold'>Login</h4>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field) => (
              <div className="mb-4" key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[field.id] ? 'border-red-500' : ''
                    }`}
                  {...register(field.id, field.validation)}
                />
                {errors[field.id] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[field.id]?.message || 'Invalid input'}
                  </p>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>
            <div className='my-4 text-center underline text-blue-400 cursor-pointer'>
              Forget Password ?
            </div>

            <div className='text-center'>
              <p>Already have a Account? <Link to="create-account"><span className='text-cyan-400 cursor-pointer underline'>Create Account</span></Link></p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side: Background Image */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url(./login_bg_image.jpg)", // Replace with your image URL
          backgroundPosition: "center center",
          backgroundSize: 'contain',
          backgroundRepeat: "no-repeat"
        }}
      ></div>
    </div>
  );
};

export default Login;
