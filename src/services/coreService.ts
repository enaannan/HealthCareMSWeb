import { Consultation, CreateConsultation } from "../interfaces/Consultations";
import { User } from "../interfaces/User";
import { axiosInstance } from "../utils/axiosConfig";
import { toast } from 'react-toastify';


const fetchConsultations = async (searchTerm: string = ''): Promise<Consultation[]> => {
    try {
      const params = searchTerm ? { search: searchTerm } : {};
      const response = await axiosInstance.get<Consultation[]>(`/api/consultations/`, { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch consultations', error);
      return [];
    }
  }

  const createConsultation = async (consultation: Partial<CreateConsultation>): Promise<Consultation | null> => {
    try {
      const response = await axiosInstance.post<Consultation>('/api/consultations/', consultation);
      toast.success('Consultation created successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to create consultation');
      console.error('Failed to create consultation', error);
      return null;
    }
  };

  const fetchUser = async (searchTerm: string = ''): Promise<User[]> => {
    try {
        const params = searchTerm ? { search: searchTerm } : {};
      const response = await axiosInstance.get(`/api/users/`,{params}
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch patients', error);
      return [];
    }
  };

export const CoreService = {
    fetchConsultations,
    createConsultation,
    fetchUser
};
