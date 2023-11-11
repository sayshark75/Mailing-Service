import express from "express";
import dotenv from "dotenv";
import mailRouter from "./routes/service.routes";
import cors from "cors";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/mail", mailRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
