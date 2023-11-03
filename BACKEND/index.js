import express from 'express'
import dotenv from 'dotenv'
import conectarDB from './config/db.js';


const app = express();
dotenv.configDotenv();


conectarDB();

const PORT = process.env.PORT || 4000;
app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})