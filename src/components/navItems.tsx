import React from 'react';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';

export interface NavItem {
  text: string;
  path: string;
  icon: React.ReactNode;
}

export const officerNavItems: NavItem[] = [
  { text: 'Officer Dashboard', path: '/officer/dashboard', icon: <SpaceDashboardIcon /> },
  { text: 'Officer Consultations', path: '/officer/consultations', icon: <AssignmentIcon /> },
];

export const practitionerNavItems: NavItem[] = [
  { text: 'Practitioner Dashboard', path: '/practitioner/dashboard', icon: <SpaceDashboardIcon /> },
  { text: 'Practitioner Consultations', path: '/practitioner/consultations', icon: <AssignmentIcon /> },
];

export const patientNavItems: NavItem[] = [
  { text: 'Patient Dashboard', path: '/patient/dashboard', icon: <SpaceDashboardIcon /> },
  { text: 'Patient Consultations', path: '/patient/consultations', icon: <AssignmentIcon /> },
];
