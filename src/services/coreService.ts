import { Consultation } from "../interfaces/Consultations";
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

export const CoreService = {
    fetchConsultations,
    createConsultation
};
