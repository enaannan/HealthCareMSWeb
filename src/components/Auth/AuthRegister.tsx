import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { Button, Grid, TextField, FormHelperText, FormControl, Select, MenuItem } from '@mui/material';
import { setPageTitle } from '../../utils/utils';
import { useAuth } from '../../hooks/useAuth';
import useScriptRef from '../../hooks/useScriptRef';
import { registerValidation } from '../../utils/validations';
import { User } from '../../interfaces/User';

const AuthRegister: React.FC = () => {
  const { register } = useAuth();
  const scriptedRef = useScriptRef();

  useEffect(() => {
    setPageTitle('Register');
  }, []);

  const initialValues = {
    username: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    contact_number: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    submit: null,
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidation}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const formattedUserValues: User = {
            username: values.username,
            first_name: values.first_name,
            last_name: values.last_name,
            date_of_birth: values.date_of_birth,
            gender: values.gender,
            contact_number: values.contact_number,
            address: values.address,
            email: values.email,
            password: values.password,
          };

          try {
            await register(formattedUserValues);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (error) {
            if (scriptedRef.current) {
              setStatus({ success: false });
              if (error instanceof Error) {
                setErrors({ submit: error.message });
              } else {
                setErrors({ submit: 'An unknown error occurred' });
              }
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleSubmit, handleChange, handleBlur, touched, values }) => {
          console.log(values)
          return(
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.first_name && Boolean(errors.first_name)}
                  helperText={touched.first_name && errors.first_name}
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.last_name && Boolean(errors.last_name)}
                  helperText={touched.last_name && errors.last_name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth error={touched.gender && Boolean(errors.gender)}>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  {touched.gender && errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="date_of_birth"
                  name="date_of_birth"
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={values.date_of_birth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.date_of_birth && Boolean(errors.date_of_birth)}
                  helperText={touched.date_of_birth && errors.date_of_birth}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="contact_number"
                  name="contact_number"
                  label="Contact Number"
                  value={values.contact_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contact_number && Boolean(errors.contact_number)}
                  helperText={touched.contact_number && errors.contact_number}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label="Address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
          )}
        }
      </Formik>
    </>
  );
};

export default AuthRegister;
