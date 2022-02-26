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
import document1 from '../documentos/formato para inscribir.pdf'
import document2 from '../documentos/Manualde procedimientos.pdf'
import document3 from '../documentos/Procedimiento proyectos.pdf'
import {Add} from "@mui/icons-material";
import {DatosUser, IsRole} from "../App";
import axios from "axios";
import baile from "../img/baile.jpg"
import cultura from "../img/cultura.webp"
import deporte from "../img/deporte.webp"
import musica from "../img/musica.webp"
import programacion from "../img/programacion.webp"
import radio from "../img/radio-locutor.jpg"
import sociedad from "../img/sociedad.jpg"
import videojuego from "../img/videojuego.webp"

export default function Inicio(): ReactElement {
    const {isRolRender} = useContext(IsRole)
    const datoUser = useContext(DatosUser)
    const [row, setRow] = useState<Array<any>>([])
    const [open, setOpen] = useState<{ open: boolean, id: number }>({open: false, id: -1});
    const [openAdd, setOpenAdd] = useState<{ open: boolean, id: number | undefined }>({open: false, id: undefined});
    const [nombre, setNombre] = useState<string>("");
    const [coordinador, setCoordinador] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");
    const [img, setImg] = useState<string>('');
    const [valido, setValido] = useState<{ nombre: boolean, coordinador: boolean, descripcion: boolean, img: boolean }>({
        nombre: true,
        coordinador: true,
        descripcion: true,
        img: false
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
            descripcion: true,
            img: true
        })
        setNombre("")
        setCoordinador("")
        setDescripcion("")
        setImg("")
        setOpenAdd({open: false, id: undefined});
    };

    const handleChangeNombre = (event: ChangeEvent<HTMLInputElement>) => {
        setValido({
            ...valido,
            nombre: event.target.value.match("^[A-Za-zƒŠŒŽšœžŸÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèé êëìíîïðñòóôõöøùúûüýþÿ]*$") === null
        })
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
        setValido({
            ...valido,
            coordinador: event.target.value.match("^[A-Za-zƒŠŒŽšœžŸÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ]*$") === null
        })
        setCoordinador(event.target.value)
    }
    const handleChangeImg = (event: SelectChangeEvent) => {
        if (event.target.value.length === 0) {
            setValido({...valido, img: true})
        } else {
            setValido({...valido, img: false})
        }
        setImg(event.target.value as string);
    };

    const save = () => {
        axios.post("/proyecto", {
            nombre: nombre,
            coordinador: coordinador,
            descripcion: descripcion,
            img: img
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
        if (id !== -1 && row.length > 0) {
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
        if (id !== -1 && row.length > 0) {
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
                    image={value?.img}
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
                                    image={value?.img}
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
                    <FormControl fullWidth sx={{marginTop: 2}}>
                        <InputLabel id="demo-simple-select-label">Imagen</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={img}
                            label="Imagen"
                            onChange={handleChangeImg}
                            error={valido.img}
                        >
                            <MenuItem value={baile}>Baile</MenuItem>
                            <MenuItem value={cultura}>Cultura</MenuItem>
                            <MenuItem value={deporte}>Deporte</MenuItem>
                            <MenuItem value={musica}>Música</MenuItem>
                            <MenuItem value={programacion}>Programación</MenuItem>
                            <MenuItem value={radio}>Radio</MenuItem>
                            <MenuItem value={videojuego}>Videojuego</MenuItem>
                            <MenuItem value={sociedad}>Sociedad</MenuItem>
                        </Select>
                    </FormControl>
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