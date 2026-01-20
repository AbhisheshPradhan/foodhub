import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { config } from "./utils/config.js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

const PORT = config.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
