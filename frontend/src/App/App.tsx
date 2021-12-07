import {ReactElement, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./paginas/Login";
import axios from "axios";
import BarraDeNavegacion from "./componentes/BarraDeNavegacion";
import img_2 from "./img/identidad/img_2.png";

export default function App(): ReactElement {
    axios.defaults.baseURL = 'http://localhost:8080';
    const body = document.getElementsByTagName("body")[0]
    const [sesion, setSesion] = useState<string>()


    body.style.backgroundImage = `url(${img_2})`;
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "cover";
    return (
        <BrowserRouter>
            <Routes>

                {(sesion !== undefined) ?
                    <>
                        <Route element={<BarraDeNavegacion/>}>
                            <Route path="/" element={<h1>Jajaja</h1>}/>
                        </Route>
                        <Route path="*" element={<h1>Error 404</h1>}/>
                    </> :
                    <Route path="*" element={<Login setSesion={setSesion}/>}/>}
            </Routes>
        </BrowserRouter>
    );
}