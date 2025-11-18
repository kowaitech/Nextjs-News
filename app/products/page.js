"use client";

import Link from "next/link";

export default function ProductsPage() {
  const products = [
    { id: 1, name: "Laptop", price: "$999" },
    { id: 2, name: "Smartphone", price: "$699" },
    { id: 3, name: "Tablet", price: "$399" },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px" }}>
        Products List
      </h1>
      <p style={{ marginBottom: "24px", color: "#666" }}>
        Click on a product to open details in a modal (intercepting route).
      </p>

      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
        {products.map((product) => (
          <li key={product.id}>
            <Link
              href={`/product/${product.id}`}
              style={{
                display: "block",
                padding: "12px",
                background: "#f0f0f0",
                borderRadius: "8px",
                cursor: "pointer",
                textDecoration: "none",
                color: "#333",
                border: "1px solid #ddd",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e0e0e0")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#f0f0f0")}
            >
              <strong>{product.name}</strong> — {product.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
