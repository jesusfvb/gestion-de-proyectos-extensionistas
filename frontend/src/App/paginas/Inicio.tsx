import {Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function Inicio() {
    return (
        <Grid container direction={"row"}>
            <Grid item xl={true} lg={true}>1</Grid>
            <Grid item container direction={"column"} justifyContent="center" alignItems="center" xl={3} lg={3}
                  sx={{
                      height: "calc(100vh - 96px)",
                      backgroundImage: "linear-gradient(200deg,#5E1914,red, orange,white,white )",
                      boxShadow: "0 0 10px 0"
                  }}>
                <Typography variant={"h4"}>
                    Documentos
                </Typography>
                <Grid sx={{width: "90%", backgroundColor: "#fff5"}}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PictureAsPdfIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Formato para inscribir los proyectos extensionistas universitarios"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PictureAsPdfIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Manual de procedimiento para crear proyectos socioculturales"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PictureAsPdfIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Inscripción de proyectos extensionistas universitarios"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Grid>
                <Typography variant={"h4"}>
                    Contactos
                </Typography>
                <Grid sx={{width: "90%", backgroundColor: "#fff5"}}>
                    <Grid container direction={"row"} sx={{padding: 1}}>
                        <LocationOnIcon sx={{marginRight: 1}}/>
                        <Typography> Centro cultural,</Typography>
                        <Typography> Segundo piso,</Typography>
                        <Typography> Departamento de Actividades</Typography>
                        <Typography> Extracurriculares.</Typography>
                    </Grid>
                    <Grid container direction={"row"} sx={{padding: 1}}>
                        <CallIcon sx={{marginRight: 1}}/>
                        <Typography> 7835-8403</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}