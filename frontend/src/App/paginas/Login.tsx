import {
    Box,
    Button,
    Checkbox,
    Container,
    createTheme,
    CssBaseline,
    FormControlLabel,
    Grid,
    Paper,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import logo from '../img/logo.png'
import {FormEvent, ReactElement} from "react";
import {useNavigate} from "react-router-dom";

export default function Login(props: { iniciarSession: Function }): ReactElement {
    const theme = createTheme()
    const navegate = useNavigate()
    const iniciarSessionM = (even: FormEvent): void => {
        even.preventDefault()
        let inputs = even.currentTarget.getElementsByTagName("input")
        props.iniciarSession(inputs[0].value, inputs[1].value)
        navegate("/inicio")
    }

    function Copyright(props: any): ReactElement {
        return (
            <Typography variant="body2" color="text.secondary" align="center"  {...props}>
                {` Universidad de las Ciencias Informáticas. XABAL. GPE Todos los derechos reservados.
                            Producto desarrollado por: DYR.
                            Fecha de Liberación 2022 Versión 0.0.1  `}
            </Typography>
        );
    }


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Paper elevation={10} sx={{padding: 3, marginTop: "20vh", borderRadius: 10}}>
                    <CssBaseline/>
                    <Box sx={{
                        display: "flex", flexDirection: "column", alignItems: "center",
                    }}>
                        <img src={logo} width={350} alt="logo"/>
                        <Box component="form" noValidate sx={{mt: 3}} onSubmit={iniciarSessionM}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Usuario" variant="standard" id="usuario"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Contraseña" type="password" id="contrasenna"
                                               autoComplete="new-password" variant="standard"/>
                                </Grid>
                                <Grid container justifyContent="center" item xs={12}>
                                    <FormControlLabel control={<Checkbox color="primary"/>}
                                                      label="Recordar Contraseña" sx={{transform: "scale(0.8)"}}/>
                                </Grid>
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" sx={{
                                mt: 3, mb: 2,
                                color: "white",
                                backgroundColor: "#7A1F3D",
                                '&:hover': {
                                    backgroundColor: "#b6325e",
                                },
                            }}>
                                Iniciar Sesión
                            </Button>
                        </Box>
                    </Box>
                </Paper>
                <Copyright sx={{mt: "5vh"}}/>
            </Container>
        </ThemeProvider>
    );
}
