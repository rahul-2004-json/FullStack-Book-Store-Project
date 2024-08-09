import React, { useState } from "react";
import axios from "axios";

const CreateBooks = () => {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [publishedYear, setPublishedyear] = useState();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      title: title,
      author: author,
      publishedYear: publishedYear,
    };

    try {
      setLoading(true);
      axios
        .post(`http://localhost:8001/books/`, data)
        .then((response) => {
          setLoading(false);
          console.log(response);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label for="title">Book Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title of Book"
            className="w-20"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label for="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Author"
            className="w-20"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label for="publishedyear">Published Year</label>
          <input
            type="text"
            id="publishedyear"
            name="publishedYear"
            placeholder="Date of Publish"
            className="w-20"
            onChange={(e) => setPublishedyear(e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreateBooks;
