import {Grid} from "@mui/material";

import robot404 from "../img/robot404.png";
import {ReactElement} from "react";

export default function E404(): ReactElement {

    const body = document.getElementsByTagName("body")[0]
    body.style.background = "none";
    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Grid
                item
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item>
                    {<img src={robot404} width={500} alt="robot404"/>}
                </Grid>

                <Grid item>
                    <h1 style={{color: "green"}}>!Vaya!</h1>
                    <h2 style={{color: "black"}}>La página no existe</h2>
                    <p>
                        «Ha habido un error con la página solicitada»
                    </p>
                    <p>
                        Es posible que hayas confundido el URL, inténtelo otra vez.
                    </p>
                </Grid>
            </Grid>
        </Grid>
    );
}
  