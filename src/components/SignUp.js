import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const SignUp = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validate: values => {
            const errors = {};

            if (!values.username) {
                errors.username = "Please enter username.";
            }
            if (!values.email) {
                errors.email = "Please enter Email.";
            }
            if (!values.password) {
                errors.password = "Please enter Password.";
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                let response = await axios.post('http://localhost:8000/auth' + '/signup', values);
                
                if (response && response.status === 201) {
                    navigate('/login');
                }
            } catch (error) {
                console.error(error, "======error");
            }
        }
    });

    return (
        <>
            <div className='auth-container'>
                <h2>Registration</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="username">Username : </label>
                        <input type="text" id="username" name="username" value={formik.values.username} onChange={formik.handleChange} placeholder='Username' />
                        {formik.errors.username ? <p className='error-message'>{formik.errors.username}</p> : null}
                    </div>
                    <div>
                        <label htmlFor="email">Email : </label>
                        <input type="email" id="email" name='email' value={formik.values.email} onChange={formik.handleChange} placeholder='Email' />
                        {formik.errors.email ? <p className='error-message'>{formik.errors.email}</p> : null}
                    </div>
                    <div>
                        <label htmlFor="password">Password : </label>
                        <input type="password" id="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='Password' />
                        {formik.errors.password ? <p className='error-message'>{formik.errors.password}</p> : null}
                    </div>
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUp;

