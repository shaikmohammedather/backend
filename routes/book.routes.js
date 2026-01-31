import express from "express";
import {
  createBook,
  getAllBook,
  updatingBook,
} from "../controllers/book.controllers.js";

const router = express.Router();

router.post("/", createBook);
router.get("/", getAllBook);
router.put("/", updatingBook);

export default router;
