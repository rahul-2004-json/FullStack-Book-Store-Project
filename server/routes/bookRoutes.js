import express from "express";
import { Book } from "../models/bookModels.js";

const router = express.Router();

//Add a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newbook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
    };

    const book = await Book.create(newbook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Some internal server error" });
  }
});

//get all books from database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Some internal server error" });
  }
});

//get a single book with id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Some internal server error" });
  }
});

//update a book with id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const updateBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
    };

    const result = await Book.findByIdAndUpdate(id, updateBook);
    if (!result) {
      return res
        .status(404)
        .send({ message: `Book with ${id} not found in database` });
    } else {
      return res.status(200).send({ message: " Book updated successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: " Some internal server error" });
  }
});

//delete a book with id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res
        .status(404)
        .send({ message: `Book with id: ${id} was not found` });
    } else {
      return res
        .status(200)
        .send({ message: `Book with id:${id} was deleted successfully` });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "There is some internal server error" });
  }
});

//Export the router just created
export default router;
