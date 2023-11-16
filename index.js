const express = require( 'express' );
const dotenv = require( 'dotenv' );
const tareasRoutes = require( './routes/tareasRoutes' );
const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());
app.use( '/', tareasRoutes );
app.get( '/', ( req, res ) => res.send( 'CiberSoft CyS ... BackEnd con MySQL' ) );
app.listen( process.env.PORT_NODE || port, () => console.log( `Servidor ejecutándose sobre el puerto ${ process.env.PORT_NODE || port } ...` ) );