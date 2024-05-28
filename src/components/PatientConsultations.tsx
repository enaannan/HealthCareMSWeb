import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Consultation } from '../interfaces/Consultations';
import { CoreService } from '../services/coreService';

const PatientConsultations: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchConsultations = async (searchTerm: string = '') => {
    setLoading(true);
    const data = await CoreService.fetchConsultations(searchTerm);
    setConsultations(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchConsultations(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const columns: GridColDef<Consultation>[] = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'healthcare_provider', headerName: 'Healthcare Provider', width: 200 },
    { field: 'consultation_type', headerName: 'Consultation Type', width: 200 },
    { field: 'medical_condition', headerName: 'Medical Condition', width: 200 },
    { field: 'notes', headerName: 'Notes', width: 300 },
    { 
      field: 'patientName', 
      headerName: 'Patient Name', 
      width: 200,
      valueGetter: (value,row) => `${row.patient.first_name} ${row.patient.last_name}`,
    },
    { 
      field: 'practitionerName', 
      headerName: 'Practitioner Name', 
      width: 200,
      valueGetter: (value,row) => `${row.practitioner.first_name} ${row.practitioner.last_name}`,
    },
  ];

  return (
    <Box sx={{ p: 2, height: '100vh', boxSizing: 'border-box' }}>
      <Typography variant="h4" gutterBottom>
        Patient Consultations
      </Typography>
      <TextField
        label="Search Consultations"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ height: 'calc(100vh - 160px)', width: '100%' }}>
          <DataGrid
            rows={consultations}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            getRowId={(row) => row.id}
          />
        </Box>
      )}
    </Box>
  );
};

export default PatientConsultations;
