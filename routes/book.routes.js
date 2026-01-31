import express from "express";
import {
  createBook,
  getAllBook,
  updatingBook,
  deletingBook,
} from "../controllers/book.controllers.js";

const router = express.Router();

router.post("/", createBook);
router.get("/", getAllBook);
router.put("/:id", updatingBook);
router.delete("/:id", deletingBook);
export default router;
