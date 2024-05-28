export interface CreateConsultation {
    id: string;
    patient: string;
    consultation_officer: string;
    date: string;
    healthcare_provider: string;
    consultation_type: string;
    medical_condition: string;
    notes: string;
  }
  

  export interface Consultation {
    id: string;
    date: string;
    healthcare_provider: string;
    consultation_type: string;
    medical_condition: string;
    notes: string;
    patient: {
      first_name: string;
      last_name: string;
    };
    practitioner: {
      first_name: string;
      last_name: string;
    };
  }