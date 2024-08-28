import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Login = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: values => {
            const errors = {};
            if (!values.email) {
                errors.email = "Please enter Email.";
            }
            if (!values.password) {
                errors.password = "Please enter Password.";
            }
            return errors;
        },
        // onSubmit: async (values) => {
        //     try {
        //         const response = await axios.post('http://localhost:8000/auth' + '/signin', values);
        //         console.log(response , "==========error");
                
        //         if (response && response.status == 200) {
        //             localStorage.setItem('token', response.data.token)
        //             navigate('/createTask')
        //         }
        //     } catch (error) {
        //         console.log(error);

        //     }
        // }
        onSubmit: async (values) => {
            try {
                let response = await axios.post('http://localhost:8000/auth' + '/signin', values);

                if (response && response.status === 200) {
                    console.log(response, "Login successful");
                    localStorage.setItem('token', response.data.token);
                    navigate('/tasks');
                }
            } catch (error) {
                console.error("Error during sign-in:", error);
                // Optionally, add code to display an error message to the user here
            }
        }
        
    });

    return (
        <div className='auth-container'>
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

