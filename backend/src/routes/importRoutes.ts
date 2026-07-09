import { Router } from "express";

import { importCsv } from "../controllers/importController";
import { upload } from "../middleware/uploadMiddleware";

const router = Router();

router.post(
  "/import",
  upload.single("file"),
  importCsv
);

export default router;