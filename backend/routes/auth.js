import express from "express";
import { handleAuth } from "../controllers/authController.js";
import { handleRefreshToken } from "../controllers/refreshTokenController.js";

const router = express.Router();

router.post('/login', handleAuth);
router.post('/refresh', handleRefreshToken);

export default router;
