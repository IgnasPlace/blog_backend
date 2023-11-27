import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import router from "./src/routes/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 8000;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: true,
  legacyHeaders: true,
});

const helmetOptions = {
  contentSecurityPolicy: {
    directives: {
      connectSrc: ["'self'", "https://jsonplaceholder.typicode.com"],
    },
  },
};

const corsOptions = {
  origin: ["localhost:5001"],
  optionsSuccessStatus: 200,
};

app.use(limiter);
app.use(helmet(helmetOptions));
app.use(cors(corsOptions));
app.use(express.json());

// Declare static folder
app.use(express.static(path.join(__dirname, "public").replace(/\\/g, "/")));

// ROUTES
app.use("/api/v1", router);

// custom 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
