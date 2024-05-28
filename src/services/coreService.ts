import { Consultation } from "../interfaces/Consultations";
import { User } from "../interfaces/User";
import { axiosInstance } from "../utils/axiosConfig";
import { toast } from 'react-toastify';


const fetchConsultations = async (): Promise<Consultation[]> => {
    try {
      const response = await axiosInstance.get<Consultation[]>('/api/consultations/');
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch consultations');
      console.error('Failed to fetch consultations', error);
      return [];
    }
  };

  const createConsultation = async (consultation: Partial<Consultation>): Promise<Consultation | null> => {
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

  const fetchUser = async (param:string): Promise<User[]> => {
    try {
      const response = await axiosInstance.get(`/api/users/?search=${param}`,
        {
            withCredentials: true
        }
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
