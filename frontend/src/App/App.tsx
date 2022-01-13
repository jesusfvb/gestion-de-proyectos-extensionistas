import {ReactElement, useEffect, useState} from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Login from "./paginas/Login";
import axios from "axios";
import BarraDeNavegacion from "./componentes/BarraDeNavegacion";
import img_2 from "./img/identidad/img_2.png";
import E404 from "./paginas/E404";
import Inicio from "./paginas/Inicio";
import Propuestas from "./paginas/Propuestas";

export default function App(): ReactElement {
    const hostname = window.location.hostname
    axios.defaults.baseURL = `http://${hostname}:8080`;
    const body = document.getElementsByTagName("body")[0]
    const [session, setSession] = useState<boolean | null>(null)

    const serrarSession = () => {
        localStorage.clear()
        setSession(false)
    }
    if (session !== false) {
        body.style.minHeight = "100vh"
        body.style.background = `linear-gradient(#fff9  , #fff9),url(${img_2})`;
    } else {
        body.style.minHeight = "auto"
        body.style.background = `url(${img_2})`;
    }
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "cover";

    useEffect(() => {
        let jwt = localStorage.getItem("jwt")
        axios.defaults.headers.common["Content-Type"] = "application/json, text/plain, */*"
        if (jwt !== null) {
            axios.defaults.headers.common['Authorization'] = jwt + "";
            setSession(true)
        } else {
            setSession(false)
        }
    }, [session])
    return (
        <BrowserRouter>
            <Routes>
                {session === null ? <Route path="*" element={null}/> : !session ?
                    <Route path="*" element={<Login setSession={setSession}/>}/> :
                    <>
                        <Route element={<BarraDeNavegacion serrarSession={serrarSession}/>}>
                            <Route path="/" element={<Navigate to={"/inicio"}/>}/>
                            <Route path="/inicio" element={<Inicio/>}/>
                            <Route path="/propuestas" element={<Propuestas/>}/>
                        </Route>
                        <Route path="*" element={<E404/>}/>
                    </>
                }
            </Routes>
        </BrowserRouter>
    );
}