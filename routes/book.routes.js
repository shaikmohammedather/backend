import express from "express";
import { createBook, getAllBook } from "../controllers/book.controllers.js";

const router = express.Router();

router.post("/", createBook);
router.get("/", getAllBook);

export default router;
