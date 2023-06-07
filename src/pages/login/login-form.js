import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from "../../components/common/copyright";
import {login} from "../../services/auth.service";
import {useRecoilState} from "recoil";
import {authStateAtom} from "./atoms/auth-state.atom";
import {useNavigate} from "react-router-dom";
import {Alert, Snackbar, Stack} from "@mui/material";

const defaultTheme = createTheme();

export default function LoginForm() {
    const [user, setUser] = useRecoilState(authStateAtom);
    const [openError, setOpenError] = React.useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const response = await login({
            username: data.get('email'),
            password: data.get('password'),
        });

        if (!response?.user) {
            setOpenError(true);
            return;
        }
        setUser(response.user);

        navigate(`/`);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Log in to Mock shop!
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log in
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 4, mb: 4 }} />
            </Container>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal:'center' }} key={'top' + 'center'} open={openError} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                        User or password incorrect
                    </Alert>
                </Snackbar>
            </Stack>
        </ThemeProvider>
    );
}
