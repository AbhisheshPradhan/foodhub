import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { config } from "../config.js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

const PORT = config.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
