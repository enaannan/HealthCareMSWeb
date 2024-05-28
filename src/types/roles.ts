export const Roles = {
    PATIENT: 'patient',
    DOCTOR: 'doctor',
    NURSE: 'nurse',
    PHARMACIST: 'pharmacist',
  };
  
  export type Role = typeof Roles[keyof typeof Roles];