import { LoginCredentials, User } from "../interfaces/User";
import { axiosInstance } from "../utils/axiosConfig";
import { toast } from 'react-toastify';

const getCurrentUser = (): User => {
  const user: User = {
    id: 1,
    email: 'bq6XH@example.com',
    username: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    contact_number: "",
    address: "",
    password: "",
    role_name: ""
  };

  return user;
};

const login = async (loginCredentials: LoginCredentials): Promise<User | null> => {
  try {
    const response = await axiosInstance.post<User>('login/', loginCredentials);
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    toast.success('Login successful');
    return user;
  } catch (error) {
    toast.error('Login failed');
    console.error('Login failed', error);
    return null;
  }
};

const register = async (user: User): Promise<User | null> => {
  try {
    const response = await axiosInstance.post<User>('/register/', user);
    localStorage.setItem('user', JSON.stringify(response.data));
    toast.success('Registration successful');
    return response.data;
  } catch (error) {
    toast.error('Registration failed');
    console.error('Registration failed', error);
    return null;
  }
};

const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post('logout');
    localStorage.removeItem('user');
    toast.success('Logout successful');
  } catch (error) {
    toast.error('Logout failed');
    console.error('Logout failed', error);
  }
};

export const AuthService = {
  login,
  register,
  logout,
  getCurrentUser
};
