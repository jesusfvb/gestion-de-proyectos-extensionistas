import {MouseEvent, ReactElement, useContext, useEffect, useState} from "react";
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
    ButtonGroup, Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@mui/material";
import {Delete, Description, Person} from "@mui/icons-material";
import axios from "axios";
import {DatosUser} from "../../App";

export default function Listado(): ReactElement {
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
            field: "cantidad",
            flex: 1,
            type: "date",
            headerName: "Cantidad",
            headerAlign: "left",
            align: "left"
        }]
    const [rows, setRows] = useState<Array<any>>([])
    const [option, setOption] = useState<1 | 2>(1)
    const [selected, setSelected] = useState<any>()

    const handleChangeOption = (option: 1 | 2) => (event: MouseEvent) => {
        setOption(option)
    }
    const handleClickRow = (params: GridRowParams, event: MuiEvent<MouseEvent<HTMLElement>>) => {
        event.preventDefault()
        setSelected(rows.find(value => value.id === params.id))
    }

    const getList = (option: number): Array<ReactElement> => {
        let salida: Array<ReactElement> = []
        if (selected !== undefined && selected !== null) {
            let pivote = selected?.[(option === 1) ? "proyectos" : "propuestas"]
            if (typeof pivote === "object")
                selected?.[(option === 1) ? "proyectos" : "propuestas"].forEach((data: any) => {
                        salida.push(
                            <TableRow
                                key={data.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {data.nombre}
                                </TableCell>
                            </TableRow>
                        )
                    }
                )
        }
        return salida;
    }

    function MyToolbar(): ReactElement {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton/>
                <ButtonGroup size={"small"} sx={{marginLeft: 1}}>
                    <Button variant={(option === 1) ? "contained" : "outlined"} onClick={handleChangeOption(1)}>
                        Participación
                    </Button>
                    <Button variant={(option === 2) ? "contained" : "outlined"} onClick={handleChangeOption(2)}>
                        Propuestas
                    </Button>
                </ButtonGroup>
                <Box sx={{flexGrow: 1}}/>
            </GridToolbarContainer>
        )
    }

    useEffect(() => {
            let url = ""
            switch (option) {
                case 1:
                    url = "/usuario/participacion"
                    break
                case 2:
                    url = "/usuario/autor"
                    break
            }
            axios
                .get(url)
                .then(response => setRows(response.data))
                .catch(error => console.error(error))
        }
        , [option])

    return (
        <Grid container>
            <Grid item style={{height: "calc(100vh - 100px)"}} xl={true} lg={true} md={true} sm={true} xs={true}>
                <DataGrid autoPageSize={true} columns={columns} rows={rows} components={{Toolbar: MyToolbar,}}
                          onRowClick={handleClickRow}
                          disableSelectionOnClick={true}/>
            </Grid>
            <Grid item xl={3} lg={3} md={2} sm={2} xs={2}>
                <TableContainer component={Paper} sx={{marginTop: 7}}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre Proyectos</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                getList(option)
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}