import { LoginCredentials, User } from "../interfaces/User"
import { axiosInstance } from "../utils/axiosConfig"


 const getCurrentUser = ():User => {
 const user:User = {
     id: 1,
     name: 'John Doe',
     email: 'bq6XH@example.com',
     username: "",
     first_name: "",
     last_name: "",
     date_of_birth: new Date(),
     gender: "",
     contact_number: "",
     address: "",
     password: "",
     role_name: ""
 }

    return user
}

const login = async (logincredentials:LoginCredentials):Promise<User | null> => {
    try{
        const response = await axiosInstance.post<User>('auth/login',(logincredentials))
        const user = response.data
        localStorage.setItem('user', JSON.stringify(user))
        return user
    }catch (error) {
        console.error('Login failed', error)
        return null
}
}

const register = async (user:User):Promise<User| null> => {
    try{
     const response = await axiosInstance.post<User>('auth/register',user)
     localStorage.setItem('user', JSON.stringify(user))
     return response.data
    }catch (error){
        console.error('Registration failed', error)
        return null
    }
}

const logout = async (): Promise<void> => {
    try{
     await axiosInstance.post('auth/logout')
     localStorage.removeItem('user');
    }
    catch (error){
        console.error('Logout failed', error)
    }
}

export const AuthService = {
    login,
    register,
    logout,
    getCurrentUser
}