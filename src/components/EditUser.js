import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';

import TextField from '@material-ui/core/TextField';
import { Button, Card, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios, { Axios } from 'axios';
const useStyles = makeStyles({
  rootContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 40,
  },
  root: {
    width: '70%',
    justifyContent: 'center',
  },
});

//==========> Formik error Validation
const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const EditUser = () => {
  const [users, setUsers] = useState();
  const params = useParams();
  const navigate = useNavigate();
  //getting user by id and display on the corresponding labwl/fields
  useEffect(async () => {
    try {
      const reqUser = await axios.get(
        `http://localhost:5000/users/${params.id}`
      );
      console.log(reqUser.data);
      formik.setValues(reqUser.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      designation: '',
      salary: '',
      experience: '',
    },
    validate,
    onSubmit: async (values) => {
      delete values._id;
      console.log(values);
      console.log(params.id);
      try {
        await axios.put(`http://localhost:5000/users/${params.id}`, values);
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    },
  });

  //======================================//===================
  const classes = useStyles();

  return (
    <div className={classes.rootContainer}>
      <Card className={classes.root}>
        <Typography variant="h5">EDIT User Details</Typography>
        <br />
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <TextField
            name="name"
            variant="outlined"
            label="Name"
            placeholder="Enter your name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? <div>{formik.errors.name}</div> : null}
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            type="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
          <TextField
            name="designation"
            variant="outlined"
            label="Designation"
            placeholder="Enter your Designation"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.designation}
          />
          <TextField
            name="salary"
            variant="outlined"
            label="salary"
            placeholder="Enter your salary"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.salary}
          />
          <TextField
            name="experience"
            variant="outlined"
            label="Experience"
            placeholder="years of experience"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.experience}
          />
          <Button type="submit" variant="contained" color="primary">
            EDIT
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default EditUser;
