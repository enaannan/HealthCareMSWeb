import React, { useState, useEffect } from 'react';
import { TextField, List, ListItem, ListItemText, Typography, Box, CircularProgress, Button } from '@mui/material';
import { Consultation } from '../interfaces/Consultations';
import { CoreService } from '../services/coreService';


const OfficerConsultation: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await CoreService.fetchConsultations();
      setConsultations(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleCreateConsultation = async () => {
    const newConsultation = {
      patient: 'patient-id', // Replace with actual patient ID
      consultation_officer: 'officer-id', // Replace with actual officer ID
      date: new Date().toISOString().split('T')[0],
      healthcare_provider: 'Healthcare Provider',
      consultation_type: 'Consultation Type',
      medical_condition: 'Medical Condition',
      notes: 'Notes',
    };

    const createdConsultation = await CoreService.createConsultation(newConsultation);
    if (createdConsultation) {
      setConsultations([...consultations, createdConsultation]);
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
      <Button variant="contained" color="primary" onClick={handleCreateConsultation} sx={{ mb: 2 }}>
        Create Consultation
      </Button>
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
