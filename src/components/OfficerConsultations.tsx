import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box, CircularProgress, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Consultation } from '../interfaces/Consultations';
import { CoreService } from '../services/coreService';
import ConsultationFormDialog from './ConsultationFormDialog';

const OfficerConsultation: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newConsultation, setNewConsultation] = useState({
    patient: '',
    practitioner: '',
    date: '',
    healthcare_provider: '',
    consultation_type: '',
    medical_condition: '',
  });

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (name: string, value: any) => {
    setNewConsultation({
      ...newConsultation,
      [name]: value,
    });
  };

  const handleCreateConsultation = async () => {
    const formattedDate = newConsultation.date ? new Date(newConsultation.date).toISOString().split('T')[0] : '';
    const createdConsultation = await CoreService.createConsultation({
      ...newConsultation,
      date: formattedDate,
    });
    if (createdConsultation) {
      setConsultations([...consultations, createdConsultation]);
      setNewConsultation({
        patient: '',
        practitioner: '',
        date: '',
        healthcare_provider: '',
        consultation_type: '',
        medical_condition: '',
      });
      setOpen(false);
    }
  };

  const columns: GridColDef[] = [
    { field: 'medical_condition', headerName: 'Medical Condition', width: 200 },   {
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
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'healthcare_provider', headerName: 'Healthcare Provider', width: 200 },
    { field: 'consultation_type', headerName: 'Consultation Type', width: 200 },
  ];

  return (
    <Box sx={{ p: 2, height: '100vh', boxSizing: 'border-box' }}>
      <Typography variant="h4" gutterBottom>
        Officer Consultations
      </Typography>
      <TextField
        label="Search Consultations"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
        Create Consultation
      </Button>
      <ConsultationFormDialog
        open={open}
        onClose={handleClose}
        onChange={handleChange}
        onSubmit={handleCreateConsultation}
        newConsultation={newConsultation}
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

export default OfficerConsultation;
