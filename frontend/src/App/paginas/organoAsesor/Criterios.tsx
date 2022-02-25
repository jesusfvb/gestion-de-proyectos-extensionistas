import {ChangeEvent, FormEvent, MouseEvent, ReactElement, useContext, useEffect, useState} from "react";
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
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import {Add, Delete, Description, LocationOn, Person, Update} from "@mui/icons-material";
import axios from "axios";
import {DatosUser} from "../../App";

export default function Criterios(): ReactElement {
    const datoUser = useContext(DatosUser)
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
            field: "coordinador",
            flex: 1,
            type: "string",
            headerName: "Coordinador",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "id",
            filterable: false,
            headerName: "Acción",
            minWidth: 130,
            renderCell: (param) => (
                <>
                    <IconButton color={"primary"} onClick={handleClickOpen(param.value)}>
                        <Update/>
                    </IconButton>
                    <IconButton color={"error"} onClick={borrar(param.value)}>
                        <Delete/>
                    </IconButton>
                </>
            )
        }]
    const [rows, setRows] = useState<Array<any>>([])
    const [open, setOpen] = useState<{ open: boolean, id: number | undefined }>({open: false, id: undefined});
    const [nombre, setNombre] = useState<string>("");
    const [coordinador, setCoordinador] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const [valido, setValido] = useState<{ nombre: boolean, coordinador: boolean, descripcion: boolean }>({
        nombre: true,
        coordinador: true,
        descripcion: true
    })
    const [selected, setSelected] = useState<any>()

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

    const handleClickOpen = (id: number | undefined = undefined) => (evento: MouseEvent) => {
        evento.stopPropagation()
        if (id !== undefined) {
            let propuesta = rows.find((p: any) => p.id === id)
            setNombre(propuesta.nombre)
            setCoordinador(propuesta.coordinador)
            setDescripcion(propuesta.description)
            setValido({
                nombre: false,
                coordinador: false,
                descripcion: false
            })
        }
        setOpen({open: true, id: id});
    };
    const handleClickClose = () => {
        setOpen({open: false, id: undefined});
        setNombre("")
        setCoordinador("")
        setDescripcion("")
        setValido({
            nombre: true,
            coordinador: true,
            descripcion: true
        })
    };

    const handleClickRow = (params: GridRowParams, event: MuiEvent<MouseEvent<HTMLElement>>) => {
        event.preventDefault()
        setSelected(rows.find(value => value.id === params.id))
    }

    const save = (evnt: FormEvent) => {
        evnt.preventDefault()
        if (!valido.nombre && !valido.descripcion && !valido.coordinador) {
            if (open.id !== undefined) {
                axios
                    .put("/criterios", {
                        id: open.id,
                        nombre: nombre,
                        coordinador: coordinador,
                        description: descripcion,
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
                    .post("/criterios", {
                        nombre: nombre,
                        coordinador: coordinador,
                        description: descripcion,
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
            .delete("/criterios", {data: (id === undefined) ? selectionModel : [id]})
            .then(response => {
                let newRow = [...rows]
                response.data.forEach((id: number) => {
                    newRow.splice(newRow.findIndex((row: any) => row.id === id), 1)
                })
                setRows(newRow)
            })
            .catch(error => console.error(error))
    }

    function MyToolbar(): ReactElement {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton/>
                <Box sx={{flexGrow: 1}}/>
                <IconButton color={"success"} onClick={handleClickOpen()}>
                    <Add/>
                </IconButton>
                <IconButton color={"error"} disabled={selectionModel.length === 0} onClick={borrar()}>
                    <Delete/>
                </IconButton>
            </GridToolbarContainer>
        )
    }

    useEffect(() => {
        axios
            .get("/criterios")
            .then(response => {
                setRows(response.data)
                setSelected(response.data[0])
            })
            .catch(error => console.error(error))
    }, [])
    return (
        <div>
            <Grid container>
                <Grid item style={{height: "calc(100vh - 100px)"}} xl={true} lg={true} md={true} sm={true} xs={true}>
                    <DataGrid autoPageSize={true} columns={columns} rows={rows} components={{Toolbar: MyToolbar,}}
                              checkboxSelection
                              onSelectionModelChange={(newSelectionModel) => {
                                  setSelectionModel(newSelectionModel);
                              }}
                              onRowClick={handleClickRow}
                              disableSelectionOnClick={true}
                              selectionModel={selectionModel}/>
                </Grid>
                <Grid item xl={3} lg={3} md={2} sm={2} xs={2}>
                    <Paper>
                        <Grid
                            container
                            direction="column"
                            justifyContent="left"
                            alignItems="flex-start"
                        >
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
                                    rows={12}
                                    value={selected?.description}
                                    sx={{paddingTop: 1, paddingRight: 2, paddingLeft: 2, paddingBottom: 2}}
                                    onChange={(event) => {
                                        event.stopPropagation()
                                        event.target.value = selected?.description
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Dialog open={open.open} onClose={handleClickClose}>
                <DialogTitle>Nuevo Criterio</DialogTitle>
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
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={save}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}