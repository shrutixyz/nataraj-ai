import React, { useEffect, useState } from "react";
import Nav from "../../features/nav/Nav";
import Styles from "./Blogs.module.css";
import Footer from "../../features/footer/Footer";
import { useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Blogs = () => {
  const [loading, setLoading] = useState(false);
  const endpoint = useSelector((state: any) => state.backend.endpoint);

  function formatDate(dateString: string): string {
    dateString = dateString.split(".")[0];
    // Extract day, month, and year from the string
    const day = dateString.substring(0, 2);
    const month = dateString.substring(2, 4);
    const year = "20" + dateString.substring(4);

    // Create a Date object
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    // Format the date using options
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const navigate = useNavigate();
  const [blogss, setBlogss] = useState({ "": "" });

  useEffect(() => {
    setLoading(true);
    getBlogs();
    setLoading(false);
  }, []);

  async function getBlogs() {
    try {
      const res = await axios.get(`${endpoint}/blogs`);
      console.log(res.data);
      setBlogss(res.data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Network Error",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
  }
  return (
    <>
      <Nav />

      <div className={Styles.info}>
        <h1 className={Styles.title}>Blogs</h1>
        {loading ? (
          <div>fetching blogs...</div>
        ) : (
          Object.entries(blogss).map(([key, value]) => (
            <div key={key} className={Styles.singleblog}>
              <b>
                <h3>{formatDate(key)}</h3>
              </b>
              <Markdown skipHtml={false}>{value}</Markdown>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default Blogs;
