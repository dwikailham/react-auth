import React, { useState, useEffect } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import {
    Box,
    Container,
    TextField,
    Typography
} from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function SignUp(props) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPwd, setConfirmPwd] = useState("")
    const [loadingButton, setLoadingButton] = useState(false)
    const [errorName, setErrorName] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPhone, setErrorPhone] = useState("")
    const [errorPasswrod, setErrorPassword] = useState("")
    const history = useHistory();

    function handleSubmit() {
        setLoadingButton(true)

        const FormData = require('form-data');

        const form = new FormData();
        form.append('name', name);
        form.append('email', email);
        form.append('phone', phone);
        form.append('password', password);
        form.append('password_confirmation', confirmPwd);

        axios.post("https://exercise.smtapps.net/api/register", form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((res) => {
                setLoadingButton(false)
                history.push({
                    pathname: '/',
                    state: {
                        modal: true,
                        message: "Your Account Has Been Created!"
                    }
                })

            })
            .catch((err) => {
                const inlineErr = err?.response?.data
                setLoadingButton(false)
                setErrorName(inlineErr.name)
                setErrorEmail(inlineErr.email)
                setErrorPhone(inlineErr.phone)
                setErrorPassword(inlineErr.password)

            })
    }

    return (
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}
        >
            <Container maxWidth="sm">
                <div
                >
                    <Box sx={{ my: 3 }}>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            Create a new account
                        </Typography>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            Use your email to create a new account
                        </Typography>
                    </Box>
                    <TextField
                        error={Boolean(errorName)}
                        fullWidth
                        helperText={errorName}
                        label="Full Name"
                        margin="normal"
                        name="firstName"
                        onChange={(e) => {
                            setName(e.target.value)
                            setErrorName("")
                        }}
                        variant="outlined"
                    />
                    <TextField
                        error={Boolean(errorEmail)}
                        fullWidth
                        helperText={errorEmail}
                        label="Email Address"
                        margin="normal"
                        name="email"
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setErrorEmail("")
                        }}
                        type="email"
                        variant="outlined"
                    />
                    <TextField
                        error={Boolean(errorPhone)}
                        fullWidth
                        helperText={errorPhone}
                        label="Phone"
                        margin="normal"
                        name="lastName"
                        onChange={(e) => {
                            setPhone(e.target.value)
                            setErrorPhone("")
                        }}
                        variant="outlined"
                    />

                    <TextField
                        error={Boolean(errorPasswrod)}
                        fullWidth
                        helperText={errorPasswrod}
                        label="Password"
                        margin="normal"
                        name="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setErrorPassword("")
                        }}
                        type="password"
                        variant="outlined"
                    />

                    <TextField
                        fullWidth
                        label="Confirm Password"
                        margin="normal"
                        name="password"
                        onChange={(e) => setConfirmPwd(e.target.value)}
                        type="password"
                        variant="outlined"
                    />
                    <Box sx={{ py: 2 }}>
                        <LoadingButton
                            loading={loadingButton}
                            color="primary"
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Sign Up Now
                        </LoadingButton>
                    </Box>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        Have an account?
                        {' '}
                        <Link
                            to='/'
                        >
                            Sign In
                        </Link>
                    </Typography>
                </div>
            </Container>
        </Box>
    )
}
