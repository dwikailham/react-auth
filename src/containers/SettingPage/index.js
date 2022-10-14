import React from 'react'
import { Box, Container, Typography } from '@mui/material';
import Dashboard from '../Dashboard'
import SettingPassword from '../../components/SettingPassword';

export default function SettingPage() {
    return (
        <>
            <Dashboard children={(
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
                            Settings
                        </Typography>
                        <Box sx={{ pt: 3 }}>
                            <SettingPassword />
                        </Box>
                    </Container>
                </Box>
            )} />
        </>
    )
}
