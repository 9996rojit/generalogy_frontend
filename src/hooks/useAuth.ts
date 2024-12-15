/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import LocalStorageUtil from "./localStorage";

interface UserDetails {
  phoneNumber: string
  email?: string;
  password: string;
  [key: string]: any; // Add more fields as required
}

interface ApiResponse {
  message: string;
  [key: string]: any; // Extend based on API response structure
}

interface UseAuthReturn {
  login: (phoneNumber: string, password: string) => Promise<ApiResponse | undefined>;
  registerUser: (userDetails: UserDetails) => Promise<ApiResponse | undefined>;
  forgotPassword: (email: string) => Promise<ApiResponse | undefined>;
  resetPassword: (token: string, newPassword: string) => Promise<ApiResponse | undefined>;
  verifyUserPhone: (phoneNumber: string | null, otp: string) => Promise<ApiResponse | undefined>;
  loading: boolean;
  error: string | null;
  success: ApiResponse | null;
}

const useAuth = (): UseAuthReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<ApiResponse | null>(null);

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL
  })
  const login = async (phoneNumber: string, password: string): Promise<ApiResponse | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post<ApiResponse>(`/login`, { phoneNumber, password });
      setSuccess(response.data);
      LocalStorageUtil.setItem('authToken', response.data.data.access)
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userDetails: UserDetails): Promise<ApiResponse | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post<ApiResponse>(`/register`, userDetails);
      setSuccess(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  const verifyUserPhone = async (phoneNumber: string | null, otp: string): Promise<ApiResponse | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post<ApiResponse>(`/verify-otp`, { phoneNumber, otp });
      setSuccess(response.data);
      LocalStorageUtil.setItem('authToken', response.data.data.access)
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<ApiResponse | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post<ApiResponse>(`/forgot-password`, { email });
      setSuccess(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<ApiResponse | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post<ApiResponse>(`/reset-password`, { token, newPassword });
      setSuccess(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    registerUser,
    forgotPassword,
    resetPassword,
    verifyUserPhone,
    loading,
    error,
    success,
  };
};

export default useAuth;
