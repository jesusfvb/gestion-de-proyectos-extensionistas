import {ChangeEvent, FormEvent, MouseEvent, ReactElement, SyntheticEvent, useEffect, useState} from "react";
import {
    DataGrid,
    GridColumns,
    GridSelectionModel,
    GridToolbarContainer,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import {
    Autocomplete, AutocompleteValue,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {Add, Delete, Update} from "@mui/icons-material";
import axios from "axios";

export default function Propuestas(): ReactElement {
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
            align: "left"
        },
        {
            field: "estado",
            flex: 1,
            type: "singleSelect",
            headerName: "Estado",
            headerAlign: "left",
            align: "left",
            valueOptions: ["PENDIENTE", "APROBADO", "DENEGADO"]
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
    const [coordinador, setCoordinador] = useState<any>();
    const [area, setArea] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const [valido, setValido] = useState<{ nombre: boolean, coordinador: boolean, area: boolean, descripcion: boolean }>({
        nombre: true,
        coordinador: true,
        area: true,
        descripcion: true
    })

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
    const handleClickClose = () => {
        setOpen({open: false, id: undefined});
        setNombre("")
        setCoordinador(null)
        setArea("")
        setDescripcion("")
        setValido({
            nombre: true,
            coordinador: true,
            area: true,
            descripcion: true
        })
    };

    const save = (evnt: FormEvent) => {
        evnt.preventDefault()
        if (!valido.nombre && !valido.area && !valido.descripcion && !valido.coordinador) {
            if (open.id !== undefined) {
                axios
                    .put("/propuestas", {
                        id: open.id,
                        nombre: nombre,
                        idCoordinador: coordinador?.id,
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
                        idCoordinador: coordinador?.id,
                        area: area,
                        descripcion: descripcion,
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

    function MyAutocomplete(): ReactElement {
        const [open, setOpen] = useState(false);
        const [options, setOptions] = useState([]);
        const loading = open && options.length === 0;

        useEffect(() => {
            if (loading) {
                axios
                    .get("/usuario")
                    .then(response => {
                        setOptions(response.data)
                    })
                    .catch(error => console.error(error))
            }
        }, [loading]);

        const handleChange = (event: SyntheticEvent, newValue: AutocompleteValue<any, any, any, any>) => {
            if (newValue !== null) {
                setValido({...valido, coordinador: false})
            } else {
                setValido({...valido, coordinador: true})
            }
            setCoordinador(newValue)
        }

        return (
            <Autocomplete
                id="nombre"
                sx={{width: "100%", paddingTop: 2}}
                open={open}
                value={coordinador}
                onChange={handleChange}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
                getOptionLabel={(option: any) => option.nombre + ""}
                options={options}
                loading={loading}
                renderInput={(params: any) => (
                    <TextField
                        {...params}
                        label="Propuesta de coordinador"
                        error={valido.coordinador}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
        );
    }

    useEffect(() => {
        axios
            .get("/propuestas")
            .then(response => setRows(response.data))
            .catch(error => console.error(error))
    }, [])
    return (
        <div style={{height: "calc(100vh - 100px)"}}>
            <DataGrid autoPageSize={true} columns={columns} rows={rows} components={{Toolbar: MyToolbar,}}
                      checkboxSelection
                      onSelectionModelChange={(newSelectionModel) => {
                          setSelectionModel(newSelectionModel);
                      }}
                      selectionModel={selectionModel}/>
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
                    <MyAutocomplete/>
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
        </div>
    )
}