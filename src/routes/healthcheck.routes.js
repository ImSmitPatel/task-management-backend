import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controllers.js";

const router = Router();

router.get("/", healthCheck);       // or  router.route("/").get(healthCheck);

export default router;