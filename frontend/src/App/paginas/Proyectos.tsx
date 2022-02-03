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
            valueOptions: ["ALMACENADO", "INSCRITO", "FINALIZADO"]
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
    const [rows, setRows] = useState<Array<any>>([])
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

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
                <IconButton color={"error"} disabled={selectionModel.length === 0} onClick={borrar()}>
                    <Delete/>
                </IconButton>
            </GridToolbarContainer>
        )
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
        </div>
    )
}