import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  publishedYear: Number,
  available: Boolean,
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
