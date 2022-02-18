import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions, DialogContent, Fab, FormControl,
    Grid, InputLabel,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText, MenuItem, Select, SelectChangeEvent, TextField,
    Typography
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {ChangeEvent, ReactElement, useContext, useEffect, useState} from "react";
import img1 from '../img/1.jpg'
import img2 from '../img/imagen2.jpg'
import img3 from '../img/imagen3.jpg'
import img4 from '../img/imagen4.jpg'
import document1 from '../documentos/formato para inscribir.pdf'
import document2 from '../documentos/Manualde procedimientos.pdf'
import document3 from '../documentos/Procedimiento proyectos.pdf'
import {Add} from "@mui/icons-material";
import {DatosUser, IsRole} from "../App";
import axios from "axios";

export default function Inicio(): ReactElement {
    const {isRolRender} = useContext(IsRole)
    const datoUser = useContext(DatosUser)
    const [row, setRow] = useState<Array<any>>([])
    const [open, setOpen] = useState<{ open: boolean, id: number }>({open: false, id: -1});
    const [openAdd, setOpenAdd] = useState<{ open: boolean, id: number | undefined }>({open: false, id: undefined});
    const [nombre, setNombre] = useState<string>("");
    const [coordinador, setCoordinador] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");
    const [valido, setValido] = useState<{ nombre: boolean, coordinador: boolean, descripcion: boolean }>({
        nombre: true,
        coordinador: true,
        descripcion: true
    })

    const handleClickOpen = (id: number) => () => {
        setOpen({open: true, id: id});
    };
    const handleClickOpenAdd = (id: number | undefined = undefined) => () => {
        setOpenAdd({open: true, id: id});
    };
    const handleClose = () => {
        setOpen({open: false, id: -1});
    };
    const handleCloseAdd = () => {
        setValido({
            nombre: true,
            coordinador: true,
            descripcion: true
        })
        setNombre("")
        setCoordinador("")
        setDescripcion("")
        setOpenAdd({open: false, id: undefined});
    };

    const handleChangeNombre = (event: ChangeEvent<HTMLInputElement>) => {
        let reg = new RegExp("^([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$")
        if (event.target.value.length === 0) {
            setValido({...valido, nombre: true})
        } else {
            setValido({...valido, nombre: reg.test(event.target.value)})
        }
        setNombre(event.target.value)
    }
    const handleChangeDescripcion = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length === 0) {
            setValido({...valido, descripcion: true})
        } else {
            setValido({...valido, descripcion: false})
        }
        setDescripcion(event.target.value)
    }
    const handleChangeCooarrdinador = (event: ChangeEvent<HTMLInputElement>) => {
        let reg = new RegExp("^([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$")
        if (event.target.value.length === 0) {
            setValido({...valido, coordinador: true})
        } else {
            setValido({...valido, coordinador: reg.test(event.target.value)})
        }
        setCoordinador(event.target.value)
    }

    const save = () => {
        axios.post("/proyecto", {
            nombre: nombre,
            coordinador: coordinador,
            descripcion: descripcion
        })
            .then(response => {
                setRow([...row, response.data])
                handleCloseAdd()
            })
            .catch(error => console.error(error))
    }
    const borrar = () => {
        axios
            .delete("/proyecto/" + open.id)
            .then(response => {
                let newRow = [...row]
                newRow.splice(newRow.findIndex((ro: any) => ro.id === response.data), 1)
                setRow(newRow)
                handleClose()
            })
            .catch(error => console.error(error))
    }

    const inscribirse = () => {
        axios
            .put('proyecto/inscribirse', {
                id: open.id,
                usuario: datoUser.usuario
            })
            .then(response => {
                getData()
                handleClose()
            })
            .catch(error => console.error(error))
    }
    const isInscrito = (id: number): boolean => {
        if (id !== -1) {
            let r = row.find(row => row.id === id)
            return r.inscritos.some((inscritos: string) => inscritos === datoUser.usuario)
        }
        return false;
    }

    const almacenar = () => {
        axios
            .put('proyecto/almacenar', {
                id: open.id,
                usuario: datoUser.usuario
            })
            .then(response => {
                getData()
                handleClose()
            })
            .catch(error => console.error(error))
    }
    const isAlmacenado = (id: number): boolean => {
        if (id !== -1) {
            let r = row.find(row => row.id === id)
            return r.almacenados.some((almacenado: string) => almacenado === datoUser.usuario)
        }
        return false;
    }

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
                        <ListItemButton component="a" download href={document1}>
                            <ListItemIcon>
                                <PictureAsPdfIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary="Formato para inscribir los proyectos extensionistas universitarios"/>
                        </ListItemButton>
                        <ListItemButton component="a" download href={document2}>
                            <ListItemIcon>
                                <PictureAsPdfIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Manual de procedimiento para crear proyectos socioculturales"/>
                        </ListItemButton>
                        <ListItemButton component="a" download href={document3}>
                            <ListItemIcon>
                                <PictureAsPdfIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Inscripción de proyectos extensionistas universitarios"/>
                        </ListItemButton>
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

    function getCard(id: number): ReactElement {
        let value = row.filter(value => value.id === id)[0]
        return (
            <Card sx={{width: 345, margin: 1}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={img1}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {value?.nombre}
                    </Typography>
                    <Typography sx={{marginTop: 1, marginBottom: 1}}>{value?.coordinador}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                        maxHeight: 200,
                        overflowY: "auto"
                    }}>
                        {value?.description}
                    </Typography>
                </CardContent>
            </Card>)
    }

    const getData = () => {
        axios
            .get("/proyecto")
            .then(response => {
                console.log(response.data)
                setRow(response.data)
            })
            .catch(error => console.error(error))
    }

    useEffect(getData, [])

    return (
        <Grid container direction={"row"}>
            <Grid item container xl={true} lg={true} sx={{height: 'calc(100vh - 96px)', overflow: 'auto'}}>
                {row.map((value) =>
                    <Grid item sx={{margin: 2}} key={value.id}>
                        <Card sx={{width: 330, height: 370}} onClick={handleClickOpen(value.id)}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={img1}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {value.nombre}
                                    </Typography>
                                    <Typography sx={{marginTop: 1, marginBottom: 1}}>{value.coordinador}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {value.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )}
            </Grid>
            {
                isRolRender("Vicedecana", (
                    <Fab color="primary" aria-label="add" sx={{
                        position: "absolute",
                        bottom: 10,
                        right: "27vw"
                    }} onClick={handleClickOpenAdd()}>
                        <Add/>
                    </Fab>
                ))
            }
            <BarraLateral/>
            <Dialog
                open={open.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {getCard(open.id)}
                <DialogActions>
                    {
                        isRolRender("Usuario", (
                            <>
                                {isInscrito(open.id) ?
                                    <Button disabled>Inscrito</Button> :
                                    <Button onClick={inscribirse}>Inscribirse</Button>}
                                {
                                    isAlmacenado(open.id) ?
                                        <Button disabled>Almacenado</Button> :
                                        <Button onClick={almacenar} color={"secondary"}>Almacenar</Button>
                                }
                            </>
                        ))
                    }
                    {
                        isRolRender("Vicedecana", (
                            <>
                                <Button onClick={borrar} color={"error"}>Borrar</Button>
                            </>
                        ))
                    }

                    <Button onClick={handleClose} autoFocus> Salir </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openAdd.open}
                onClose={handleCloseAdd}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent sx={{width: 350}}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nombre"
                        label="Nombre"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={nombre}
                        onChange={handleChangeNombre}
                        error={valido.nombre}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="coordinador"
                        label="Coordinador"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={coordinador}
                        onChange={handleChangeCooarrdinador}
                        error={valido.coordinador}
                    />
                    <TextField
                        id="descripcion"
                        label="Descripción"
                        multiline
                        fullWidth
                        rows={5}
                        variant="outlined"
                        sx={{marginTop: 2}}
                        value={descripcion}
                        error={valido.descripcion}
                        onChange={handleChangeDescripcion}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd} color={"error"} autoFocus> Cancelar </Button>
                    <Button onClick={save} color={"secondary"}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}