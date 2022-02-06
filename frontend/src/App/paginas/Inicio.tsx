import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {ReactElement, useState} from "react";
import img1 from '../img/1.jpg'

export default function Inicio(): ReactElement {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    function BarraLateral(): ReactElement {
        return (
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
        )
    }

    return (
        <Grid container direction={"row"}>
            <Grid item container xl={true} lg={true} sx={{height: 'calc(100vh - 96px)', overflow: 'auto'}}>
                {[1, 2, 4, 5, 6, 7, 8, 9, 10].map((value) =>
                    <Grid item sx={{margin: 2}}>
                        <Card sx={{maxWidth: 345}} onClick={handleClickOpen}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={img1}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )}
            </Grid>
            <BarraLateral/>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Card sx={{maxWidth: 345, margin: 1}} onClick={handleClickOpen}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={img1}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <DialogActions>
                    <Button onClick={handleClose}>Inscribirse</Button>
                    <Button onClick={handleClose} color={"secondary"}>Almacenar</Button>
                    <Button onClick={handleClose} color={"error"} autoFocus> Salir </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}