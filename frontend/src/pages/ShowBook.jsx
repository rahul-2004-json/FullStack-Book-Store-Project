import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [bookinfo, setBookInfo] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // never use useParams inside the useEffect hooks

  useEffect(() => {
    try {
      setLoading(true);
      axios
        .get(`http://localhost:8001/books/${id}`)
        .then((response) => {
          setLoading(false);
          console.log(response.data);
          setBookInfo(response.data);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <p> Title : {bookinfo?.title}</p>
          <p> Author: {bookinfo?.author}</p>
          <p>Published Year: {bookinfo?.publishedYear}</p>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
