import React, { useState, useEffect, useCallback } from "react";
import 'font-awesome/css/font-awesome.min.css';

function QuoteBox() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [bgColor, setBgColor] = useState("#4caf50"); // Initial background color

  // Wrap fetchQuote in useCallback to memoize the function
  const fetchQuote = useCallback(async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content || "No quote available.");
      setAuthor(data.author || "Unknown");
      changeBackgroundColor();
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  }, []); // Empty dependency array ensures it only gets recreated once

  const changeBackgroundColor = () => {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    setBgColor(randomColor);
  };

  useEffect(() => {
    fetchQuote(); // Call the fetchQuote function once the component is mounted
  }, [fetchQuote]);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-color 0.5s ease",
      }}
    >
      <div
        id="quote-box"
        style={{
          textAlign: "center",
          width: "90%",
          maxWidth: "600px",
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <p
          id="text"
          style={{
            fontSize: "1.8em",
            color: bgColor,
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          <i
            className="fa fa-quote-left"
            aria-hidden="true"
            style={{ marginRight: "10px" }}
          ></i>
          {quote}
        </p>
        <p
          id="author"
          style={{
            textAlign: "right",
            fontSize: "1.2em",
            color: "#555",
            marginBottom: "30px",
          }}
        >
          - {author}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <a
              id="tweet-quote"
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                `"${quote}" - ${author}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", marginRight: "10px" }}
            >
              <button
                style={{
                  backgroundColor: bgColor,
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <i className="fa fa-twitter"></i>
              </button>
            </a>
            <a
  id="tumblr-repost"
  href={`https://www.tumblr.com/share/link?url=${encodeURIComponent("https://your-website-url.com")}&name=${encodeURIComponent(quote)}&description=${encodeURIComponent(author)}`}
  target="_blank"
  rel="noopener noreferrer"
  style={{ textDecoration: "none" }}
>
  <button
    style={{
      backgroundColor: bgColor,
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    <i className="fa fa-tumblr"></i>
  </button>
</a>

          </div>
          <button
            id="new-quote"
            onClick={fetchQuote}
            style={{
              backgroundColor: bgColor,
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuoteBox;
