import React from 'react';
import { Box, Grid, Typography, Card, CardContent, Link } from "@mui/material";
import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthBackground from "./AuthBackground";

interface AuthWrapperProps {
    children: ReactNode;
    footerText: string;
    footerLinkText: string;
    footerLinkTo: string;
}

const AuthWrapper = ({ children, footerText, footerLinkText, footerLinkTo }: AuthWrapperProps) => {
    return (
        <Box sx={{ minHeight: '100vh', position: 'relative' }}>
            <AuthBackground />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    minHeight: '100vh',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 1,
                    padding: 2,
                }}
            >
                <Grid item xs={12} container justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
                        <Card
                            elevation={6}
                            sx={{
                                borderRadius: 2,
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                            }}
                        >
                            <CardContent>
                                <Typography
                                    sx={{
                                        fontSize: { xs: 24, sm: 26, md: 28, lg: 30 },
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        mt: 3,
                                        mb: 3,
                                        color: 'primary.main',
                                        lineHeight: { xs: 2, sm: 2, md: 2, lg: 2 },
                                    }}
                                >
                                    Your health our priority
                                </Typography>
                                {children}
                                <Typography
                                    sx={{
                                        mt: 2,
                                        textAlign: 'center',
                                    }}
                                >
                                    {footerText}{' '}
                                    <Link
                                        component={RouterLink}
                                        to={footerLinkTo}
                                        sx={{ textDecoration: 'none', color: 'secondary.main' }}
                                    >
                                        {footerLinkText}
                                    </Link>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AuthWrapper;
