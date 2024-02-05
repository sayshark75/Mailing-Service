import express from "express";
import dotenv from "dotenv";
import mailRouter from "./routes/service.routes";
import cors from "cors";

const app = express();

dotenv.config();
const allowedOrigins = [process.env.ORIGIN_GLOBAL, process.env.ORIGIN_LOCAL, process.env.ORIGIN_CLIENT];

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/mail", mailRouter);

// No default get request, because we serving a static page from directory "/public"

app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
