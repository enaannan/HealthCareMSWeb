import { LoginCredentials, User } from "../interfaces/User";
import { axiosInstance } from "../utils/axiosConfig";
import { toast } from 'react-toastify';


const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await axiosInstance.get<User>('api/current-user/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch current user', error);
    return null;
  }
};

const login = async (loginCredentials: LoginCredentials): Promise<User | null> => {
  try {
    const response = await axiosInstance.post<{ access: string; refresh: string }>('login/', loginCredentials);
    const { access, refresh } = response.data;

  
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;

    const user = await getCurrentUser();
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Login successful');
    } else {
      toast.error('Failed to fetch current user');
    }

    return user;
  } catch (error) {
    toast.error('Login failed');
    console.error('Login failed', error);
    return null;
  }
};

export { login, getCurrentUser };


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

export const CoreAuthService = {
  login,
  register,
  logout,
  getCurrentUser
};
