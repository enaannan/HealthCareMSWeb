import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Autocomplete } from '@mui/material';
import { CoreService } from '../services/coreService';
import { User } from '../interfaces/User';

interface ConsultationFormDialogProps {
  open: boolean;
  onClose: () => void;
  onChange: (name: string, value: any) => void;
  onSubmit: () => void;
  newConsultation: {
    patient: string;
    practitioner: string;
    date: string;
    healthcare_provider: string;
    consultation_type: string;
    medical_condition: string;
    notes: string;
  };
}

const ConsultationFormDialog: React.FC<ConsultationFormDialogProps> = ({ open, onClose, onChange, onSubmit, newConsultation }) => {
  const [patients, setPatients] = useState<User[]>([]);
  const [practitioners, setPractitioners] = useState<User[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const fetchedPatients = await CoreService.fetchUser("patient");
      setPatients(fetchedPatients);
    };

    const fetchPractitioners = async () => {
      const fetchedPractitioners = await CoreService.fetchUser("doctor");
      setPractitioners(fetchedPractitioners);
    };

    fetchPatients();
    fetchPractitioners();
  }, []);

  const handlePatientChange = (event: any, value: User | null) => {
    if (value) {
      onChange('patient', value.id);
    } else {
      onChange('patient', '');
    }
  };

  const handlePractitionerChange = (event: any, value: User | null) => {
    if (value) {
      onChange('practitioner', value.id);
    } else {
      onChange('practitioner', '');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Consultation</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={patients}
          getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
          onChange={handlePatientChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Patient"
              margin="normal"
              fullWidth
            />
          )}
        />
        <Autocomplete
          options={practitioners}
          getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
          onChange={handlePractitionerChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Practitioner"
              margin="normal"
              fullWidth
            />
          )}
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={newConsultation.date}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Healthcare Provider"
          name="healthcare_provider"
          value={newConsultation.healthcare_provider}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Consultation Type"
          name="consultation_type"
          value={newConsultation.consultation_type}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Medical Condition"
          name="medical_condition"
          value={newConsultation.medical_condition}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Notes"
          name="notes"
          value={newConsultation.notes}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          fullWidth
          margin="normal"
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConsultationFormDialog;
