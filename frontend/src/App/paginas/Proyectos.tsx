import {ChangeEvent, MouseEvent, ReactElement, useContext, useEffect, useState} from "react";
import {
    DataGrid,
    GridColumns, GridRowParams,
    GridSelectionModel,
    GridToolbarContainer,
    GridToolbarFilterButton, MuiEvent
} from "@mui/x-data-grid";
import {
    Box,
    Button,
    ButtonGroup,
    Dialog, DialogActions, DialogContent,
    DialogTitle, FormControl,
    Grid,
    IconButton, InputLabel, MenuItem,
    Paper, Select, SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import {Delete, Description, LocationOn, Person} from "@mui/icons-material";
import axios from "axios";
import {DatosUser} from "../App";

export default function Proyectos(): ReactElement {
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
            field: "estado",
            flex: 1,
            type: "singleSelect",
            headerName: "Estado",
            headerAlign: "left",
            align: "left",
            valueOptions: ["ACTIVO", "CULMINADO"]
        },
        {
            field: "id",
            filterable: false,
            headerName: "Acción",
            minWidth: 10,
            renderCell: (param) => (
                <>
                    <IconButton color={"error"} onClick={borrar(param.value)}>
                        <Delete/>
                    </IconButton>
                </>
            )
        }]
    const datoUser = useContext(DatosUser)
    const [rows, setRows] = useState<Array<any>>([])
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const [option, setOption] = useState<1 | 2>(1)
    const [selected, setSelected] = useState<any>()

    const handleChangeOption = (option: 1 | 2) => (event: MouseEvent) => {
        setOption(option)
    }
    const handleClickRow = (params: GridRowParams, event: MuiEvent<MouseEvent<HTMLElement>>) => {
        event.preventDefault()
        setSelected(rows.find(value => value.id === params.id))
    }

    const borrar = (id: number | undefined = undefined) => (event: MouseEvent) => {
        event.stopPropagation()
        axios
            .delete("/proyecto/quitar/" + ((option === 1) ? "inscripcion" : "almacen"), {
                data: {
                    id: id,
                    usuario: datoUser.usuario
                }
            })
            .then(response => {
                let newRow = [...rows]
                newRow.splice(newRow.findIndex((row: any) => row.id === response.data), 1)
                setRows(newRow)
            })
            .catch(error => console.error(error))
    }

    function MyToolbar(): ReactElement {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton/>
                <ButtonGroup size={"small"} sx={{marginLeft: 1}}>
                    <Button variant={(option === 1) ? "contained" : "outlined"} onClick={handleChangeOption(1)}>
                        Actuales
                    </Button>
                    <Button variant={(option === 2) ? "contained" : "outlined"} onClick={handleChangeOption(2)}>
                        Almacenados
                    </Button>
                </ButtonGroup>
                <Box sx={{flexGrow: 1}}/>
                <IconButton color={"error"} disabled={selectionModel.length === 0} onClick={borrar()}>
                    <Delete/>
                </IconButton>
            </GridToolbarContainer>
        )
    }

    useEffect(() => {
        let url = ""
        switch (option) {
            case 1:
                url = "/proyecto/actuales/usuario/" + datoUser.usuario
                break
            case 2:
                url = "/proyecto/almacenado/usuario/" + datoUser.usuario
                break
        }
        axios
            .get(url)
            .then(response => setRows(response.data))
            .catch(error => console.error(error))
    }, [option])
    return (
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
    )
}