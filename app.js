import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cors from "cors";
import path from "path";
import session from "express-session";
import passport from "passport";
import { fileURLToPath } from "url";
import router from "./src/routes/index.js";
import xss from "xss-clean";
import compression from "compression";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(
  session({
    secret: "iggyDev",
    resave: false,
    saveUninitialized: false,
    maxAge: 1000 * 60 * 60 * 24,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.enable("trust proxy");

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
  origin: [process.env.BACKEND_API_URL, "http://localhost:5173"],
  methods: "GET,POST,PATCH,DELETE",
  // optionsSuccessStatus: 200,
  credentials: true,
};

app.use(limiter);
app.use(helmet(helmetOptions));
app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Data sanitization against XSS
app.use(xss());

app.use(compression());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Declare static folder
// app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/", router);

// custom 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
