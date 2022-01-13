import {
    AppBar,
    Badge,
    Box,
    CssBaseline,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Tab,
    Tabs,
    Toolbar,
    Typography
} from "@mui/material";
import {Fragment, MouseEvent, ReactElement, SyntheticEvent, useEffect, useRef, useState} from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from "../img/logo.png";
import {useLocation, useNavigate, Outlet} from "react-router-dom";

export default function BarraDeNavegacion(props: { serrarSession: Function }): ReactElement {
    const menuId = 'primary-search-account-menu';
    const location = useLocation()
    const navegate = useNavigate()
    const cuenta = useRef<Element>()
    const [anchorEl, setAnchorEl] = useState<null | Element>(null);
    const [value, setValue] = useState<string>("/inicio");

    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event: MouseEvent): void => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = (): void => {
        setAnchorEl(null);
    };
    const handleSerrarSession = (): void => {
        props.serrarSession()
    }

    const handleChange = (event: SyntheticEvent, newValue: string): void => {
        navegate(newValue)
        setValue(newValue);
    };

    useEffect(() => {
        if (location.pathname === "/") {
            setValue("/inicio")
        } else {
            setValue(location.pathname)
        }
    }, [location.pathname])
    return (
        <Fragment>
            <CssBaseline/>
            <AppBar sx={{
                color: "white",
                backgroundImage: "linear-gradient(200deg,#5E1914,red, orange,white,white )",
            }}>
                <Toolbar>
                    <Grid container direction={"row"} justifyContent="space-between" alignItems="center">
                        <img src={logo} width={400} alt="logo" style={{margin: 0, padding: 0}}/>
                        <Grid item xl={7} lg={7} container direction="column">
                            <Grid container direction="column" justifyContent="center" alignItems="flex-end">
                                <Box ref={cuenta}>
                                    <IconButton aria-label="show 17 new notifications" color="inherit">
                                        <Badge badgeContent={17} color="error">
                                            <NotificationsIcon/>
                                        </Badge>
                                    </IconButton>
                                    <Typography variant={"overline"}
                                                sx={{fontSize: 15, marginLeft: 3}}> dayanabb</Typography>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                    <Menu anchorEl={anchorEl} id={menuId} keepMounted open={isMenuOpen}
                                          onClose={handleMenuClose}
                                          transformOrigin={{
                                              vertical: 'top',
                                              horizontal: 'right',
                                          }}
                                          anchorOrigin={{
                                              vertical: 'top',
                                              horizontal: 'right'
                                          }}
                                    >
                                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                                        <MenuItem onClick={handleSerrarSession}>Cerrar Sesión</MenuItem>
                                    </Menu>
                                </Box>
                            </Grid>
                            <Tabs value={value} onChange={handleChange} textColor="inherit">
                                <Tab label="Inicio" value={"/inicio"}/>
                                <Tab label="Proyectos" value={"/proyectos"}/>
                                <Tab label="Propuestas" value={"/propuestas"}/>
                            </Tabs>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Box marginTop={4}>
                <Outlet/>
            </Box>
        </Fragment>
    );
}
