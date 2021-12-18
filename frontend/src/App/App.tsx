import {ReactElement, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./paginas/Login";
import axios from "axios";
import BarraDeNavegacion from "./componentes/BarraDeNavegacion";
import img_2 from "./img/identidad/img_2.png";
import E404 from "./paginas/E404";

export default function App(): ReactElement {
    axios.defaults.baseURL = 'http://localhost:8080';
    const body = document.getElementsByTagName("body")[0]
    const [session, setSession] = useState<string | null>(localStorage.getItem("jwt"))

    const serrarSession = () => {
        localStorage.clear()
        setSession(null)
    }

    if (session !== null) {
        body.style.minHeight = "100vh"
        body.style.background = `linear-gradient(#fff9  , #fff9),url(${img_2})`;
    } else {
        body.style.minHeight = "auto"
        body.style.background = `url(${img_2})`;
    }
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "cover";
    return (
        <BrowserRouter>
            <Routes>

                {(session !== null) ?
                    <>
                        <Route element={<BarraDeNavegacion serrarSession={serrarSession}/>}>
                            <Route path="/" element={<h1>Inicio</h1>}/>
                        </Route>
                        <Route path="*" element={<E404/>}/>
                    </> :
                    <Route path="*" element={<Login setSession={setSession}/>}/>}
            </Routes>
        </BrowserRouter>
    );
}