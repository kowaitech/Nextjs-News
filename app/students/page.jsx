import Header from "../components/Header";

export const dynamic = "force-dynamic"; // ensures SSR each request

const NEWS_API_KEY = process.env.NEWS_API_KEY;  // set your API key in env
const NEWS_URL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${NEWS_API_KEY}`;

export default async function NewsSSR() {
  const res = await fetch(NEWS_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    // handle error
    return (
      <div>
        <Header />
        <div className="container py-5">
          <h2 className="fw-bold text-primary mb-4">Live News (SSR)</h2>
          <p className="text-danger">Failed to load news. Try again later.</p>
        </div>
      </div>
    );
  }

  const data = await res.json();
  const articles = data.articles ?? [];

  return (
    <div>
      <Header />
      <div className="container py-5">
        <h2 className="fw-bold text-primary mb-4">Live News (SSR)</h2>
        <div className="row g-4">
          {articles.map((art, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="card shadow-sm border-0">
                {art.urlToImage && (
                  <img 
                    src={art.urlToImage} 
                    className="card-img-top" 
                    alt={art.title}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title fw-semibold">{art.title}</h5>
                  <p className="card-text text-muted">{art.description}</p>
                  <a href={art.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    Read more
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
