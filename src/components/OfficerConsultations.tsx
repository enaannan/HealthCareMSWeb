import React, { useState, useEffect } from 'react';
import { TextField, List, ListItem, ListItemText, Typography, Box, CircularProgress, Button } from '@mui/material';
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
    consultation_officer: '',
    date: '',
    healthcare_provider: '',
    consultation_type: '',
    medical_condition: '',
    notes: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await CoreService.fetchConsultations();
      setConsultations(data);
      setLoading(false);
    };

    fetchData();
  }, []);

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
        consultation_officer: '',
        date: '',
        healthcare_provider: '',
        consultation_type: '',
        medical_condition: '',
        notes: '',
      });
      setOpen(false);
    }
  };

  const filteredConsultations = consultations.filter((consultation) =>
    consultation.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.healthcare_provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.consultation_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.medical_condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 2 }}>
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
        <List>
          {filteredConsultations.map((consultation) => (
            <ListItem key={consultation.id}>
              <ListItemText
                primary={`Date: ${consultation.date}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      Patient: {consultation.patient}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Healthcare Provider: {consultation.healthcare_provider}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Type: {consultation.consultation_type}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Medical Condition: {consultation.medical_condition}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Notes: {consultation.notes}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default OfficerConsultation;
