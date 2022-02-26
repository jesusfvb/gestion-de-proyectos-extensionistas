import {ChangeEvent, FormEvent, MouseEvent, ReactElement, SyntheticEvent, useContext, useEffect, useState} from "react";
import {
    DataGrid,
    GridColumns,
    GridRowParams,
    GridSelectionModel,
    GridToolbarContainer,
    GridToolbarFilterButton,
    MuiEvent
} from "@mui/x-data-grid";
import {
    Autocomplete,
    AutocompleteValue,
    Box,
    Button, ButtonGroup,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import {Add, CheckCircle, Delete, Description, HighlightOff, LocationOn, Person, Update} from "@mui/icons-material";
import axios from "axios";
import {DatosUser} from "../../App";

export default function PropuestasVicedecana(): ReactElement {
    const datoUser = useContext(DatosUser)
    const [option, setOption] = useState<1 | 2>(1)
    const columns: GridColumns = [
        {
            field: "nombre",
            flex: 1,
            type: "string",
            headerName: "Nombre",
            headerAlign: "left",
            align: "left"
        },
        {
            field: "fechaSolicitud",
            flex: 1,
            type: "date",
            headerName: "Fecha",
            headerAlign: "left",
            align: "left",
            hide: option === 2
        },
        {
            field: "coordinador",
            flex: 1,
            type: "string",
            headerName: "Coordinador",
            headerAlign: "left",
            align: "left",
            hide: option === 1,
        },
        {
            field: "estado",
            flex: 1,
            type: "singleSelect",
            headerName: "Estado",
            headerAlign: "left",
            align: "left",
            hide: option === 2,
            valueOptions: ["PENDIENTE", "ACEPTADA", "DENEGADA"]
        },
        {
            field: "id",
            filterable: false,
            headerName: "Acción",
            minWidth: 200,
            hide: option === 2,
            renderCell: (param) => (
                <>
                    <IconButton color={"success"} onClick={aceptar(param.value)}>
                        <CheckCircle/>
                    </IconButton>
                    <IconButton color={"error"} onClick={denegar(param.value)}>
                        <HighlightOff/>
                    </IconButton>
                    <IconButton color={"primary"} onClick={handleClickOpen(param.value)}>
                        <Update/>
                    </IconButton>
                    {
                        (rows.filter(row => row.id === param.value)[0]?.usuario === datoUser.usuario) ?
                            <IconButton color={"error"} onClick={borrar(param.value)}>
                                <Delete/>
                            </IconButton>
                            : null
                    }
                </>
            )
        }]
    const [rows, setRows] = useState<Array<any>>([])
    const [open, setOpen] = useState<{ open: boolean, id: number | undefined }>({open: false, id: undefined});
    const [nombre, setNombre] = useState<string>("");
    const [coordinador, setCoordinador] = useState<string>("");
    const [area, setArea] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const [valido, setValido] = useState<{ nombre: boolean, coordinador: boolean, area: boolean, descripcion: boolean }>({
        nombre: true,
        coordinador: true,
        area: true,
        descripcion: true
    })
    const [selected, setSelected] = useState<any>()
    const [openVer, setOpenVer] = useState<boolean>(false)

    const handleChangeNombre = (event: ChangeEvent<HTMLInputElement>) => {
        let reg = new RegExp("^([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$")
        if (event.target.value.length === 0) {
            setValido({...valido, nombre: true})
        } else {
            setValido({...valido, nombre: reg.test(event.target.value)})
        }
        setNombre(event.target.value)
    }
    const handleChangeArea = (event: SelectChangeEvent) => {
        if (event.target.value !== "") {
            setValido({...valido, area: false})
        } else {
            setValido({...valido, area: true})
        }
        setArea(event.target.value as string);
    };
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
    const handleChangeOption = (option: 1 | 2) => (event: MouseEvent) => {
        setOption(option)
    }

    const handleClickOpen = (id: number | undefined = undefined) => (evento: MouseEvent) => {
        evento.stopPropagation()
        if (id !== undefined) {
            let propuesta = rows.find((p: any) => p.id === id)
            setNombre(propuesta.nombre)
            setCoordinador(propuesta.coordinador)
            setArea(propuesta.area)
            setDescripcion(propuesta.descripcion)
            setValido({
                nombre: false,
                coordinador: false,
                area: false,
                descripcion: false
            })
        }
        setOpen({open: true, id: id});
    };
    const handleClickOpenVer = () => {
        setOpenVer(true);
    };
    const handleClickClose = () => {
        setOpen({open: false, id: undefined});
        setNombre("")
        setCoordinador("")
        setArea("")
        setDescripcion("")
        setValido({
            nombre: true,
            coordinador: true,
            area: true,
            descripcion: true
        })
    };
    const handleClickCloseVer = () => {
        setOpenVer(false)
    };

    const handleClickRow = (params: GridRowParams, event: MuiEvent<MouseEvent<HTMLElement>>) => {
        event.preventDefault()
        setSelected(rows.find(value => value.id === params.id))
        handleClickOpenVer()
    }

    const save = (evnt: FormEvent) => {
        evnt.preventDefault()
        if (!valido.nombre && !valido.area && !valido.descripcion && !valido.coordinador) {
            if (open.id !== undefined) {
                axios
                    .put("/propuestas", {
                        id: open.id,
                        nombre: nombre,
                        coordinador: coordinador,
                        area: area,
                        descripcion: descripcion,
                    })
                    .then(response => {
                        let newRow = [...rows]
                        newRow[newRow.findIndex((row: any) => row.id === open.id)] = response.data
                        setRows(newRow)
                        handleClickClose()
                    })
                    .catch(error => console.error(error))
            } else {
                axios
                    .post("/propuestas", {
                        nombre: nombre,
                        coordinador: coordinador,
                        area: area,
                        descripcion: descripcion,
                        autor: datoUser.usuario,
                    })
                    .then(response => {
                        setRows([...rows, response.data])
                        handleClickClose()
                    })
                    .catch(error => console.error(error))
            }
        }
    }
    const borrar = (id: number | undefined = undefined) => (event: MouseEvent) => {
        event.stopPropagation()
        axios
            .delete("/propuestas", {data: (id === undefined) ? selectionModel : [id]})
            .then(response => {
                let newRow = [...rows]
                response.data.forEach((id: number) => {
                    newRow.splice(newRow.findIndex((row: any) => row.id === id), 1)
                })
                setRows(newRow)
            })
            .catch(error => console.error(error))
    }

    const aceptar = (id: number | undefined = undefined) => (event: MouseEvent) => {
        event.stopPropagation()
        axios
            .put("/propuestas/aceptar", (id === undefined) ? selectionModel : [id])
            .then(response => {
                let newRow = [...rows]
                response.data.forEach((d: any) => {
                    newRow.splice(newRow.findIndex((row: any) => row.id === d.id), 1, d)
                })
                setRows(newRow)
            })
            .catch(error => console.error(error))
    }
    const denegar = (id: number | undefined = undefined) => (event: MouseEvent) => {
        event.stopPropagation()
        axios
            .put("/propuestas/denegar", (id === undefined) ? selectionModel : [id])
            .then(response => {
                let newRow = [...rows]
                response.data.forEach((d: any) => {
                    newRow.splice(newRow.findIndex((row: any) => row.id === d.id), 1, d)
                })
                setRows(newRow)
            })
            .catch(error => console.error(error))
    }

    function MyToolbarPropuestas(): ReactElement {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton/>
                <ButtonGroup size={"small"} sx={{marginLeft: 1}}>
                    <Button variant={(option === 1) ? "contained" : "outlined"} onClick={handleChangeOption(1)}>
                        Propuestas
                    </Button>
                    <Button variant={(option === 2) ? "contained" : "outlined"} onClick={handleChangeOption(2)}>
                        Criterios
                    </Button>
                </ButtonGroup>
                <Box sx={{flexGrow: 1}}/>
                {
                    option === 2 ? null : (
                        <>
                            <IconButton color={"success"} disabled={selectionModel.length === 0} onClick={aceptar()}>
                                <CheckCircle/>
                            </IconButton>
                            <IconButton color={"error"} disabled={selectionModel.length === 0} onClick={denegar()}>
                                <HighlightOff/>
                            </IconButton>
                            <IconButton color={"success"} onClick={handleClickOpen()}>
                                <Add/>
                            </IconButton>
                        </>
                    )
                }

            </GridToolbarContainer>
        )
    }

    useEffect(() => {
        axios
            .get(option === 2 ? "/criterios/listos" : "/propuestas")
            .then(response => {
                setRows(response.data)
                setSelected(response.data[0])
            })
            .catch(error => console.error(error))
    }, [option])
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item style={{height: "calc(100vh - 100px)"}} xl={true} lg={true} md={true} sm={true} xs={true}>
                    <DataGrid autoPageSize={true} columns={columns} rows={rows}
                              components={{Toolbar: MyToolbarPropuestas,}}
                              checkboxSelection={option !== 2}
                              onSelectionModelChange={(newSelectionModel) => {
                                  setSelectionModel(newSelectionModel);
                              }}
                              onRowClick={handleClickRow}
                              disableSelectionOnClick={true}
                              selectionModel={selectionModel}/>
                </Grid>
            </Grid>
            <Dialog open={open.open} onClose={handleClickClose}>
                <DialogTitle>Nueva Propuesta</DialogTitle>
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
                    <FormControl fullWidth sx={{marginTop: 2}}>
                        <InputLabel id="area-label">Area</InputLabel>
                        <Select
                            labelId="area-label"
                            id="area"
                            value={area}
                            label="Area"
                            onChange={handleChangeArea}
                            error={valido.area}
                        >
                            <MenuItem value={'Facultad_1'}>Facultad 1</MenuItem>
                            <MenuItem value={'Facultad_2'}>Facultad 2</MenuItem>
                            <MenuItem value={'Facultad_3'}>Facultad 3</MenuItem>
                            <MenuItem value={'Facultad_4'}>Facultad 4</MenuItem>
                            <MenuItem value={'Facultad_fte'}>Facultad FTE</MenuItem>
                            <MenuItem value={'Facultad_6'}>Facultad 6</MenuItem>
                            <MenuItem value={'Deportes'}>Deportes</MenuItem>
                            <MenuItem value={'CIDI'}>CIDI</MenuItem>
                            <MenuItem value={'CESOL'}>CESOL</MenuItem>
                            <MenuItem value={'TLM'}>TLM</MenuItem>
                            <MenuItem value={'CIGED'}>CIGED</MenuItem>
                            <MenuItem value={'CEGEL'}>CEGEL</MenuItem>
                            <MenuItem value={'CEIGE'}>CEIGE</MenuItem>
                            <MenuItem value={'FORTES'}>FORTES</MenuItem>
                            <MenuItem value={'CREAD'}>CREAD</MenuItem>
                            <MenuItem value={'CTI'}>CTI</MenuItem>
                            <MenuItem value={'CENTRO_DE_SOPORTE'}>CENTRO DE SOPORTE</MenuItem>
                            <MenuItem value={'Fuera_de_la_universidad'}>Fuera de la universidad </MenuItem>
                            <MenuItem value={'Transportación'}>Transportación</MenuItem>
                        </Select>
                    </FormControl>
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
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={save}>Aceptar</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openVer} onClose={handleClickCloseVer}>
                <DialogTitle>{option === 2 ? "Criterio" : "Propuesta"}</DialogTitle>
                <DialogContent sx={{width: 450, height: option === 2 ? "40vh" : "70vh"}}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="left"
                        alignItems="flex-start"
                    >
                        {option === 2 ? null : (
                            <>
                                <Typography sx={{marginLeft: 2, marginBottom: 2, marginTop: 1}} variant={"h4"}>
                                    {selected?.nombre}
                                </Typography>
                                <Typography sx={{marginLeft: 2, marginBottom: 1,}} variant={"subtitle1"}>
                                    Información
                                </Typography>
                                <Grid item container direction="row" sx={{marginBottom: 1}}>
                                    <Person sx={{marginLeft: 2, marginRight: 1}}/>
                                    <Typography variant={"h6"} sx={{marginRight: 1}}>
                                        Coordinador:
                                    </Typography>
                                    <Typography variant={"h5"}>
                                        {selected?.coordinador}
                                    </Typography>
                                </Grid>
                                <Grid item container direction="row" sx={{marginBottom: 1}}>
                                    <LocationOn sx={{marginLeft: 2, marginRight: 1}}/>
                                    <Typography variant={"h6"} sx={{marginRight: 1}}>
                                        Area:
                                    </Typography>
                                    <Typography variant={"h5"}>
                                        {selected?.area}
                                    </Typography>
                                </Grid>
                            </>
                        )}
                        <Grid item container direction="column">
                            <Grid item container direction="row" sx={{marginBottom: 1}}>
                                <Description sx={{marginLeft: 2, marginRight: 1}}/>
                                <Typography variant={"h6"} sx={{marginRight: 1}}>
                                    Descripción:
                                </Typography>
                            </Grid>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={7}
                                value={option === 2 ? selected?.description : selected?.descripcion}
                                sx={{paddingTop: 1, paddingRight: 2, paddingLeft: 2, paddingBottom: 2}}
                                onChange={(event) => {
                                    event.stopPropagation()
                                    event.target.value = option === 2 ? selected?.description : selected?.descripcion
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseVer}>Salir</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}