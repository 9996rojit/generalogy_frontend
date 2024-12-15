/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import LocalStorageUtil from '../hooks/localStorage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface OTPFormData {
  otp: string[];
}

const OTPVerify: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<OTPFormData>({
    defaultValues: { otp: ['', '', '', '', '', ''] },
  });
  const { verifyUserPhone, loading, error, success } = useAuth()
  const navigate = useNavigate()
  // Refs to manage focus for each input
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const onSubmit = async (data: OTPFormData) => {
    const phoneNumber: string | null = LocalStorageUtil.getItem('phoneNumber')
    const otpCode = data.otp.join('');
    console.log('OTP Code:', otpCode);
    await verifyUserPhone(phoneNumber, otpCode)
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>,
    index: number,
    field: any
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.value.replace(/[^0-9]/g, '');

    if (e.type === 'change') {
      if (value.length <= 1) {
        field.onChange(value);

        // Move focus to the next input if a digit is entered
        if (value && index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    }

    // Handle backspace navigation
    if (e.type === 'keydown' && (e as React.KeyboardEvent).key === 'Backspace') {
      if (!value && index > 0) {
        inputRefs.current[index - 1]?.focus();
        field.onChange(''); // Clear current field
      }
    }
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
    <div className="flex justify-center items-center min-h-screen bg-lamaPurpleLight p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Verify OTP</h2>
        <p className="text-center text-gray-600">Enter the 4-digit code sent to your email</p>

        {/* OTP Inputs */}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Controller
              key={index}
              name={`otp.${index}` as const}
              control={control}
              rules={{
                required: "This field is required",
                pattern: { value: /^[0-9]$/, message: "Only numbers are allowed" }
              }}
              render={({ field }) => (
                <input
                  {...field}
                  ref={(el) => (inputRefs.current[index] = el)}  // Store each input ref in array
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleInputChange(e, index, field)}
                  onKeyDown={(e) => handleInputChange(e, index, field)}
                />
              )}
            />
          ))}
        </div>

        {errors.otp && (
          <p className="text-red-500 text-sm text-center">{errors.otp[0]?.message}</p>
        )}

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OTPVerify;
