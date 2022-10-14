import React, { useState, useEffect } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Container, TextField, Typography, Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useLocation, useHistory, Link } from 'react-router-dom';

export default function LoginPage(props) {
    const history = useHistory();
    const [modalSukses, setModalSukses] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const location = useLocation();

    function handleLogin() {
        const FormData = require('form-data');

        const form = new FormData();
        form.append('email', email);
        form.append('password', password);

        setLoadingButton(true)
        axios.post("https://exercise.smtapps.net/api/login", form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((res) => {
                setLoadingButton(false)
                console.log(res);
                setEmail("")
                setPassword("")
                const response = res?.data;
                sessionStorage.setItem('accessToken', response?.data?.access_token)
                history.push({
                    pathname: '/account',
                    state: {
                        access_token: response?.access_token,
                        token_type: response?.token_type,
                        email: response?.user?.email,
                        name: response?.user?.name
                    }
                })

            }).catch((err) => {
                setLoadingButton(false)
                const inlineErr = err?.response?.data
                setErrorEmail(inlineErr.email)
                setErrorPassword(inlineErr.password)
            })
    }

    useEffect(() => {
        if (location?.state?.modal) {
            setModalSukses(true)
        } else {
            setModalSukses(false)
        }
    }, [])

    return (
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 2,
                minHeight: '100%'
            }}
        >

            <Container maxWidth="sm">
                <Collapse in={modalSukses}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setModalSukses(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {location?.state?.message}
                    </Alert>
                </Collapse>

                <div>
                    <Box sx={{ my: 3 }}>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            Sign in
                        </Typography>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            Sign in on the internal platform
                        </Typography>
                    </Box>
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
                        value={email}
                        type="email"
                        variant="outlined"
                    />
                    <TextField
                        error={Boolean(errorPassword)}
                        fullWidth
                        helperText={errorPassword}
                        label="Password"
                        margin="normal"
                        name="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setErrorPassword("")
                        }}
                        value={password}
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
                            onClick={handleLogin}
                        >
                            Sign In Now
                        </LoadingButton>
                    </Box>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        Don&apos;t have an account?
                        {' '}
                        <Link to='/registrasi'>
                            Sign Up
                        </Link>
                    </Typography>
                </div>

            </Container>
        </Box>

    )
}
