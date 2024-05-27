import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});


export const registerValidation = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  date_of_birth: Yup.date().required('Date of birth is required'),
  gender: Yup.string().required('Gender is required'),
  contact_number: Yup.string().required('Contact number is required'),
  address: Yup.string().required('Address is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  role_name: Yup.string().required('Role is required'),
});