import React, { useState, useRef, useEffect, useCallback } from "react";
import useFetch from "./hooks/useFetch";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { loading, error, list } = useFetch(query, page);
  const loader = useRef(null);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div className="App">
      <h1>Infinite Scroll</h1>
      <h2>with IntersectionObserver</h2>
      <input type="text" value={query} onChange={handleChange} />
      <div>
        {list.map((book, i) => (
          <div key={i}>{book}</div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      <div ref={loader} />
    </div>
  );
}

export default App;
