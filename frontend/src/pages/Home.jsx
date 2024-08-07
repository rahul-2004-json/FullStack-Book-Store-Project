import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      //axios creates a promise that can either be resolved or rejected
      axios
        .get("http://localhost:8001/books") //this is get request to our server
        .then((response) => {
          setBooks(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  }, []);

  function handleDelete(id) {
    try {
      axios
        .delete(`http://localhost:8001/books/${id}`)
        .then((response) => {
          console.log("Book deleted successfully");
          setBooks((prevbooks) => prevbooks.filter((book) => book._id !== id));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  console.log(books);

  return (
    <div className="flex flex-col justify-center text-center items-center">
      <div className="my-12 text-2xl font-bold">Books List</div>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">Published Year</th>
              <th className="py-2 px-4 border-b">Options</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="4"
                  className="py-4 flex justify-center items-center "
                >
                  <Spinner />
                </td>
              </tr>
            ) : (
              books.map((book, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{book.title}</td>
                  <td className="py-2 px-4 border-b">{book.author}</td>
                  <td className="py-2 px-4 border-b">{book.publishedYear}</td>
                  <td className="flex justify-center items-center gap-4">
                    <div className="hover:cursor-pointer">
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle />
                      </Link>
                    </div>
                    <div className="hover:cursor-pointer">
                      <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit />
                      </Link>
                    </div>
                    <div className="hover:cursor-pointer">
                      <button
                        onClick={() => {
                          handleDelete(book._id);
                        }}
                      >
                        <MdOutlineDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
