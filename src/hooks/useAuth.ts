/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";

interface UserDetails {
  email: string;
  password: string;
  [key: string]: any; // Add more fields as required
}

interface ApiResponse {
  message: string;
  [key: string]: any; // Extend based on API response structure
}

interface UseAuthReturn {
  login: (phoneNumber: string, password: string) => Promise<ApiResponse | undefined>;
  register: (userDetails: UserDetails) => Promise<ApiResponse | undefined>;
  forgotPassword: (email: string) => Promise<ApiResponse | undefined>;
  resetPassword: (token: string, newPassword: string) => Promise<ApiResponse | undefined>;
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
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async (userDetails: UserDetails): Promise<ApiResponse | undefined> => {
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
    register,
    forgotPassword,
    resetPassword,
    loading,
    error,
    success,
  };
};

export default useAuth;
