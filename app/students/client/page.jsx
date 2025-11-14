"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/app/components/Header";

export default function NewsCSR() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(5); // Default number of articles

  // Function to fetch articles dynamically based on limit
  const fetchArticles = async (limitValue) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.spaceflightnewsapi.net/v4/articles/?limit=${limitValue}`
      );
      setArticles(res.data.results);
      setError("");
    } catch (err) {
      setError("⚠️ Failed to fetch news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page loads or when limit changes
  useEffect(() => {
    fetchArticles(limit);
  }, [limit]);

  return (
    <>
     <Header/>
              <div className="container py-5">
      <h2 className="fw-bold text-primary mb-4 text-center">
        🛰️ Spaceflight News (CSR)
      </h2>

      {/* Interactive limit selector */}
      <div className="d-flex justify-content-center align-items-center mb-4">
        <label className="me-2 fw-semibold">Show Articles:</label>
        <select
          className="form-select w-auto"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>

      {/* Conditional rendering */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3 text-secondary">Fetching latest space news...</p>
        </div>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : (
        <div className="row g-4">
          {articles.map((art) => (
            <div className="col-md-4" key={art.id}>
              <div className="card shadow-sm border-0 h-100">
                {art.image_url && (
                  <img
                    src={art.image_url}
                    className="card-img-top"
                    alt={art.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold">{art.title}</h5>
                  <p className="card-text text-muted flex-grow-1">
                    {art.summary?.slice(0, 100) || "No description available."}…
                  </p>
                  <a
                    href={art.url}
                    className="btn btn-primary mt-auto"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    </>
  
  );
}
