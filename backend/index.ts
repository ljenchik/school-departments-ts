import departmentRoutes from './routes/departmentRoutes';
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use('/', departmentRoutes)




app.listen(port, () => console.log(`Listening on port ${port}.`))