import Book from "../models/book.model.js";

async function createBook(req, res) {
  try {
    const createdBook = await Book.create(req.body);
    res.status(201).json({
      message: "Book Created Successfully",
      data: createdBook,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
async function getAllBook(req, res) {
  try {
    const allBook = await Book.find();
    res.status(200).json({
      count: allBook.length,
      data: allBook,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
async function updatingBook(req, res) {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not Found",
      });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
async function deletingBook(req, res) {}
export { createBook, getAllBook, updatingBook };
