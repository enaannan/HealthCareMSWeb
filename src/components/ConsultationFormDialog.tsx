import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

interface ConsultationFormDialogProps {
  open: boolean;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Consultation</DialogTitle>
      <DialogContent>
        <TextField
          label="Patient"
          name="patient"
          value={newConsultation.patient}
          onChange={onChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Consultation Officer"
          name="consultation_officer"
          value={newConsultation.consultation_officer}
          onChange={onChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={newConsultation.date}
          onChange={onChange}
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
          onChange={onChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Consultation Type"
          name="consultation_type"
          value={newConsultation.consultation_type}
          onChange={onChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Medical Condition"
          name="medical_condition"
          value={newConsultation.medical_condition}
          onChange={onChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Notes"
          name="notes"
          value={newConsultation.notes}
          onChange={onChange}
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
