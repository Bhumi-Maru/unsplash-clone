import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  // Fetch default images when the page loads
  useEffect(() => {
    fetchDefaultImages();
  }, []);

  const fetchDefaultImages = async () => {
    fetch(
      `https://api.unsplash.com/search/photos?client_id=sa5mpe6riXlgllK0TTIfAdHQI1FH4PrCtQICWsnR7FY&query=nature&orientation=squarish`
    )
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results);
      });
  };

  const fetchImages = () => {
    fetch(
      `https://api.unsplash.com/search/photos?client_id=sa5mpe6riXlgllK0TTIfAdHQI1FH4PrCtQICWsnR7FY&query=${value}&orientation=squarish`
    )
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results);
      });
    setValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchImages();
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Image Gallery</h1>
        <p>Search for beautiful images</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for images..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => fetchImages()}>Search</button>
      </div>

      <div className="gallery">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={item.id} className="image-container">
              <img
                src={item.urls.regular}
                className="item"
                alt={item.alt_description}
              />
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
