import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import conectarDB from './config/db.js';
import clienteRoutes from './routes/clienteRoutes.js'
import presupuestoRoutes from './routes/presupuestoRoutes.js'
import cestaRoutes from './routes/cestaRoutes.js'




const app = express();
app.use(express.json());

dotenv.configDotenv();

const dominiosPermitidos = ['http://127.0.0.1:5500/'];
const corsOptions = {
    origin: function (origin, callback) {
       if(dominiosPermitidos.indexOf(origin) !==-1){
          callback(null, true);
       } else {
          callback(new Error('No permitido por Cors'));
       }
       
    }
 }

 app.use(cors(dominiosPermitidos));
 
conectarDB();



app.use('/webdev/clientes', clienteRoutes);
app.use('/webdev/cestas', cestaRoutes);
app.use('/webdev/presupuestos', presupuestoRoutes);

const PORT = process.env.PORT || 4500;
app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})