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
    consultation_officer: string;
    date: string;
    healthcare_provider: string;
    consultation_type: string;
    medical_condition: string;
    notes: string;
  };
}

const ConsultationFormDialog: React.FC<ConsultationFormDialogProps> = ({ open, onClose, onChange, onSubmit, newConsultation }) => {
  const [patients, setPatients] = useState<User[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const fetchedPatients = await CoreService.fetchUser("patient");
      setPatients(fetchedPatients);
    };

    fetchPatients();
  }, []);

  const handlePatientChange = (event: any, value: User | null) => {
    if (value) {
      onChange('patient', value.id);
    } else {
      onChange('patient', '');
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
        <TextField
          label="Consultation Officer"
          name="consultation_officer"
          value={newConsultation.consultation_officer}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          fullWidth
          margin="normal"
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
