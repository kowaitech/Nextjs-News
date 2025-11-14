import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container text-center py-5">
      <h1 className="fw-bold text-danger mb-3">404 - Page Not Found</h1>
      <p className="text-secondary">
        Sorry, the page or article you’re looking for doesn’t exist.
      </p>
      <Link href="/" className="btn btn-primary mt-3">
        ⬅️ Go Back Home
      </Link>
    </div>
  );
}
