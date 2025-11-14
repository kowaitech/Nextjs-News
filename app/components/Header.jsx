"use client";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold">
           News Portal
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/students" className="nav-link">News</Link>
            </li>
            <li className="nav-item">
              <Link href="/students/client" className="nav-link">Spaceflight News</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
