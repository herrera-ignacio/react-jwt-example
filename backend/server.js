import express from "express";
import 'express-async-errors';
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions.js";
import credentialsMiddleware from "./middlewares/credentials.js";
import rootRouter from "./routes/root.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";

const PORT = 3001;

const app = express();

// Handle options credentials check - before CORS!
// Fetch cookies credentials requirement
app.use(credentialsMiddleware)

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Handle json
app.use(express.json());

// Handle cookies
app.use(cookieParser());

// Routes
app.use('/', rootRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// Start listening
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
