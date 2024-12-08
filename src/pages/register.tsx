import React from 'react';
import { useForm } from 'react-hook-form';
import { register as RegisterForm } from '../fields/register.json'

interface RegisterFormData {
  userName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>({
    defaultValues: {
      userName: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('Registration Data:', data);
  };

  // Watch the password field to validate confirmPassword
  const password = watch("password");

  return (
    <div className="flex justify-center items-center min-h-screen bg-lamaPurpleLight p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Register</h2>

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
      </form >
    </div >
  );
};

export default Register;
