import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { setPageTitle } from '../../utils/utils';
import { useAuth } from '../../hooks/useAuth';
import useScriptRef from '../../hooks/useScriptRef';
import { loginValidation } from '../../utils/validations';

const AuthLogin: React.FC = () => {
  const { login } = useAuth()
  const scriptedRef = useScriptRef();

  useEffect(() => {
    setPageTitle('Login')
  }, []);
const initialValues = {
  email: '',
  password: '',
  submit: null
}
  return (
    <>
    <Formik 
    initialValues={initialValues} 
    validationSchema={loginValidation}
    onSubmit={ async (values, {setSubmitting,setStatus,setErrors
    }) =>{
      try {
        await login({ email: values.email, password: values.password });
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
        {({errors,handleSubmit,handleChange,handleBlur,touched,values})=>{
          return(
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>

                {/* email */}
                <Stack spacing ={1}>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <OutlinedInput
                  id='email'
                  type='email'
                  value={values.email}
                  name='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Enter email'
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  autoFocus
                  />
                  {errors.email && touched.email && <FormHelperText>{errors.email}</FormHelperText>}
                </Stack>
              </Grid>

              {/* password */}
              <Grid item xs={12}>
                <Stack spacing ={1}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                  id='password'
                  type='password'
                  value={values.password}
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Enter password'
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  />
                  {errors.password && touched.password && <FormHelperText>{errors.password}</FormHelperText>}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" type="submit">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>)
        }}
      
    </Formik>
    </>

  );
};

export default AuthLogin;
