import express from "express";
const cors = require('cors');
import 'reflect-metadata';
import { routers } from "./api/routes";
import { AppDataSource } from "./typeorm/data-source";

const app = express()

const PORT = 5050;

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

(async () => {
    AppDataSource.initialize()
        .then(() => {
            console.log('Database Conneted');
        })
        .catch((error) => console.log(error));
})();

app.use('/api', routers);



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});