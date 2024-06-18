import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios, { AxiosError } from 'axios';
import { BASE_URL_LOCAL } from '../../constants/BASE_URL';
import { Alert } from '@mui/material';
import { goListShopping, goSubgroups } from '../../Routes/coordinator';
import { useNavigate } from 'react-router-dom';

type severity = "success" | "info" | "warning" | "error"

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export const SignInSide = () => {
    const [showAlert, setShowAlert] = React.useState<{status: boolean, typeAlert: severity, message: string}>({status: false, typeAlert: 'success', message: ""});

    const handleAlert = async (typeAlert: severity, message: string) => {

        setShowAlert({
            status: true,
            typeAlert: typeAlert,
            message
        })

        setTimeout(() => {
            setShowAlert(
                {
                    status: false,
                    typeAlert: "success",
                    message: ""
                }
            )
        }, typeAlert === "success" ? 2000 : 3000)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        try {
            const body = {
                email: data.get('email'),
                password: data.get('password')
            }

            const login = await axios.post(BASE_URL_LOCAL + '/users/login', body)
    
            localStorage.setItem('token', login.data.token)
            localStorage.setItem('idUser', login.data.idUser)

            await handleAlert('success', 'Logado com sucesso!')
            goListShopping(navigate)
        } catch (error) {
            
            if(error instanceof AxiosError){
                console.log("Axios erro:", error)

                await handleAlert('error', error.response?.data)

            }else{

                await handleAlert('error', "Erro inesperado")
            }
            
        }

    };
    
    const navigate = useNavigate()

    React.useEffect(() => {
        if(localStorage.getItem('token')){
            goSubgroups(navigate)
        }
    }, [])

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Lembre-me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Entrar
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Esqueceu sua senha?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Não tem uma conta? Inscrever-se"}
                                    </Link>
                                </Grid>
                            </Grid>
                            {showAlert.status ? <Alert severity={showAlert.typeAlert}>{showAlert.message}</Alert> : ""}
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}