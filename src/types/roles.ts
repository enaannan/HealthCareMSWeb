export const Roles = {
    PATIENT: 'patient',
    DOCTOR: 'doctor',
    NURSE: 'nurse',
    PHARMACIST: 'pharmacist',
    OFFICER: 'officer',
  };
  
  export type Role = typeof Roles[keyof typeof Roles];