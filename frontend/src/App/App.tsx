import {createContext, ReactElement, useEffect, useState} from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Login from "./paginas/Login";
import axios from "axios";
import BarraDeNavegacion from "./componentes/BarraDeNavegacion";
import img_2 from "./img/identidad/img_2.png";
import E404 from "./paginas/E404";
import Inicio from "./paginas/Inicio";
import Propuestas from "./paginas/Propuestas";
import Proyectos from "./paginas/Proyectos";
import {useSnackbar} from "notistack";
import isJwtTokenExpired, {decode} from "jwt-check-expiry";
import PropuestasVicedecana from "./paginas/visedecana/PropuestasVicedecana";
import PropuestasAsesor from "./paginas/organoAsesor/PropuestasAsesor";
import Listado from "./paginas/visedecana/Listado";
import Criterios from "./paginas/organoAsesor/Criterios";

interface InterfaceDatosUser {
    usuario: string,
}

export const DatosUser = createContext<InterfaceDatosUser>({
    usuario: "",
})
export const IsRole = createContext<{
    isRolRender: Function,
    isRolBoolean: Function,
}>({
    isRolRender: () => {
    },
    isRolBoolean: () => {
    }
})

export default function App(): ReactElement {
    const hostname = window.location.hostname
    axios.defaults.baseURL = `http://${hostname}:8080`;
    const body = document.getElementsByTagName("body")[0]
    const [session, setSession] = useState<boolean | null>(null)
    const {enqueueSnackbar} = useSnackbar();
    const [datosUser, setDatosUser] = useState<InterfaceDatosUser>({
        usuario: "",
    })
    const [roles, setRoles] = useState<Array<{ authority: string }>>([])

    const iniciarSession = (usuario: string, contrasenna: string): void => {
        axios
            .post("/login", {
                usuario: usuario,
                contrasenna: contrasenna
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(datos => {
                localStorage.setItem("jwt", datos.data)
                procesarToken(datos.data)
            })
            .catch(() => {
                enqueueSnackbar("Usuario o Contraseña Incorrecta")
            })
    }
    const cerrarSession = () => {
        localStorage.clear()
        sessionFalse()
    }

    const sessionTrue = (jwt: string) => {
        body.style.background = "none";
        axios.defaults.headers.common['Authorization'] = jwt;
        setSession(true)
    }
    const sessionFalse = () => {
        body.style.backgroundImage = `url(${img_2})`;
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
        setSession(false)
    }

    const procesarToken = (jwt: string) => {
        try {
            let jwtDecode: any = decode(jwt).payload;
            if (!isJwtTokenExpired(jwt)) {
                setDatosUser({
                    usuario: jwtDecode.sub,
                })
                setRoles(jwtDecode.roles)
                sessionTrue(jwt)
            } else {
                sessionFalse()
            }
        } catch (e) {
            sessionFalse()
        }
    }

    const isRolRenderF = (rol: string | Array<string>, render: ReactElement): ReactElement | null => {
        let salida: ReactElement | null = null;
        if (roles.length !== 0) {
            if (typeof rol === "string") {
                if (roles.some(value => value.authority === rol)) {
                    salida = render;
                }
            } else {
                rol.forEach(value => {
                    if (roles.some(value1 => value1.authority === value)) {
                        salida = render;
                        return;
                    }
                });
            }
        }
        return salida;
    }
    const isRolBooleanF = (rol: string | Array<string>): boolean => {
        let salida: boolean = false;
        if (roles.length !== 0) {
            if (typeof rol === "string") {
                if (roles.some(value => value.authority === rol)) {
                    salida = true;
                }
            } else {
                rol.forEach(value => {
                    if (roles.some(value1 => value1.authority === value)) {
                        salida = true;
                        return;
                    }
                });
            }
        }
        return salida;
    }

    useEffect(() => {
        let jwt = localStorage.getItem("jwt")
        axios.defaults.headers.common["Content-Type"] = "application/json, text/plain, */*"
        if (jwt !== null) {
            procesarToken(jwt)
        } else {
            sessionFalse()
        }
    }, [])
    return (
        <DatosUser.Provider value={datosUser}>
            <IsRole.Provider value={{isRolRender: isRolRenderF, isRolBoolean: isRolBooleanF}}>
                <BrowserRouter>
                    <Routes>
                        {session === null ? <Route path="*" element={null}/> : !session ?
                            <Route path="*" element={<Login iniciarSession={iniciarSession}/>}/> :
                            <>
                                <Route element={<BarraDeNavegacion serrarSession={cerrarSession}/>}>
                                    <Route path="/" element={<Navigate to={"/inicio"}/>}/>
                                    <Route path="/inicio" element={<Inicio/>}/>
                                    <Route path="/propuestas"
                                           element={(isRolBooleanF("Vicedecana")) ? <PropuestasVicedecana/> :
                                               isRolBooleanF("Asesor") ? <PropuestasAsesor/> :
                                                   <Propuestas/>}/>
                                    <Route path="/proyectos" element={<Proyectos/>}/>
                                    <Route path="/criterios" element={<Criterios/>}/>
                                    <Route path="/listado" element={<Listado/>}/>
                                </Route>
                                <Route path="*" element={<E404/>}/>
                            </>
                        }
                    </Routes>
                </BrowserRouter>
            </IsRole.Provider>
        </DatosUser.Provider>
    );
}