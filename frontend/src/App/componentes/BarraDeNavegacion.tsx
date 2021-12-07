import {
    AppBar,
    Badge,
    Box,
    CssBaseline,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    useScrollTrigger
} from "@mui/material";
import {cloneElement, Fragment, ReactElement, useState, MouseEvent, useRef} from "react";
import {Outlet} from "react-router";
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from "../img/logo.png";

export default function BarraDeNavegacion() {
    const menuId = 'primary-search-account-menu';
    const cuenta = useRef<Element>()
    const [anchorEl, setAnchorEl] = useState<null | Element>(null);

    const isMenuOpen = Boolean(anchorEl);
    const getAnchorEl=(element:Element)=>{

        return element
    }

    const handleProfileMenuOpen = (event: MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function ElevationScroll(props: { window?: () => Window; children: ReactElement; }) {
        const {children, window} = props;
        const trigger = useScrollTrigger({
            disableHysteresis: true,
            threshold: 0,
            target: window ? window() : undefined,
        });

        return cloneElement(children, {
            elevation: trigger ? 4 : 0,
        });
    }

    return (
        <Fragment>
            <CssBaseline/>
            <ElevationScroll>
                <AppBar sx={{
                    color: "white",
                    backgroundImage: "linear-gradient(200deg,#5E1914,red, orange,white,white )",
                }}>
                    <Toolbar>
                        <img src={logo} width={500} alt="logo"/>
                        <Box sx={{flexGrow: 1}}/>
                        <Box ref={cuenta}>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
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
                            <Menu anchorEl={getAnchorEl} id={menuId} keepMounted open={isMenuOpen}
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
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar/>
            <Grid container direction="column">
                <Grid item>
                    <Outlet/>
                </Grid>
            </Grid>
        </Fragment>
    );
}
