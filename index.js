/**
 * Created by g.siradze on 12/12/2017.
 */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from "./src/routes/routes";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_HOST, {
    useMongoClient: true
}, () => console.log('db connected'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.listen(PORT, () => console.log(`running on port: ${PORT}`));