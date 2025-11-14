import Header from "./components/Header";
import { notFound } from "next/navigation";

// Metadata for SEO
export const metadata = {
  title: "Home |  News",
  description: "Stay updated with the latest spaceflight and rocket news.",
};

//  SSG: Fetch at build time using Next.js `fetch` with revalidate option

export const revalidate = 3600; // Rebuild every 1 hour (Static Site Generation + ISR)

export default async function Home() {
  
  const res = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=6", {
    next: { revalidate: 3600 }, // ensure incremental static regeneration
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news"); // handled by error.js
  }

  // const data = await res.json();
  
  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    notFound(); // triggers not-found.js
  }

  const articles = data.results ?? [];


  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="bg-light text-center py-5 border-bottom">
        <div className="container">
          <h1 className="display-5 fw-bold text-primary mb-3">
             News Portal
          </h1>
          <p className="lead text-secondary mb-4">
            Get the latest news and updates from the world of rockets, launches, and space missions.
          </p>
          <a href="/students" className="btn btn-primary btn-lg">
            Explore Live News
          </a>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="container py-5">
        <h2 className="fw-bold text-center text-primary mb-4">
          🛰️ Latest Spaceflight Articles
        </h2>

        <div className="row g-4">
          {articles.map((art) => (
            <div className="col-md-4" key={art.id}>
              <div className="card h-100 shadow-sm border-0">
                {art.image_url && (
                  <img
                    src={art.image_url}
                    alt={art.title}
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold">{art.title}</h5>
                  <p className="card-text text-muted flex-grow-1">
                    {art.summary?.slice(0, 100)}…
                  </p>
                  <a
                    href={art.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm mt-auto"
                  >
                    Read Full Article
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <a href="/students/client" className="btn btn-success btn-lg">
            🔍 View More News (CSR Example)
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p className="mb-0 small">
          © {new Date().getFullYear()} Spaceflight News | Built with Next.js SSG 🚀
        </p>
      </footer>
    </div>
  );
}
