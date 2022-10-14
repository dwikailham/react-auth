import React, { useEffect } from 'react'
import { Box, Container, Typography } from '@mui/material';
import Dashboard from '../Dashboard';
import Account from '../../components/Account';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function AccountPage() {
    const location = useLocation()

    const token = location.state.access_token
    const typeToken = location.state.token_type

    var api = axios.create({
        baseURL: 'https://exercise.smtapps.net/api/',
        timeout: 10000,
        transformRequest: [(data) => data],
        headers:
        {
            'Accept': 'application/json,*/*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Authorization',
            'Authorization': 'Bearer ' + token
        }
    })

    // let config = {
    //     headers: { 'Authorization': 'Bearer ' + token }
    // }

    function getProfile() {
        axios.get('https://exercise.smtapps.net/api/user-profile',
            {
                headers: {
                    // 'Accept': 'application/json,*/*',
                    // 'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Headers': 'Authorization',
                    'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZXhlcmNpc2Uuc210YXBwcy5uZXRcL2FwaVwvbG9naW4iLCJpYXQiOjE2NjU3MDY1MzcsImV4cCI6MTY2NTcxMDEzNywibmJmIjoxNjY1NzA2NTM3LCJqdGkiOiI3VEh3YTNkbXJONFRaeElyIiwic3ViIjo1NiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.WRGd74qRcqrwvUbP2IGwf0a2KSWzq_vMshSfYCo16Vs"
                },
            }
        )
            .then((res) => {

                console.log(res);

            })
            .catch((err) => {

                console.log("error", err);

            })

    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <>
            <Dashboard children={
                (
                    <React.Fragment>
                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                                py: 8
                            }}
                        >
                            <Container maxWidth="lg">
                                <Typography
                                    sx={{ mb: 3 }}
                                    variant="h4"
                                >
                                    Account
                                </Typography>
                                <Account />
                            </Container>
                        </Box>
                    </React.Fragment>
                )
            } />
        </>
    )
}
