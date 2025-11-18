"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

/**
 * INTERCEPTING ROUTE - Modal Page
 *
 * File Path: app/products/(..)product/[id]/page.js
 *
 * How it works:
 * 1. When you click a product link on /products (e.g., href="/product/1")
 * 2. Next.js matches /product/1 but INTERCEPTS it with this route
 * 3. This modal renders ON TOP of the /products page (doesn't reload the page)
 * 4. If you visit /product/1 directly from the address bar, this route is NOT intercepted
 *    and you see the normal full-page view instead
 *
 * The (..) means: "intercept routes from parent segments"
 * - From app/products/(..)product/[id]/ going up 2 levels → intercepts /product/[id]
 */

export default function ProductModal({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const product = {
    1: { name: "Laptop", price: "$999", description: "High-performance laptop for work and gaming" },
    2: { name: "Smartphone", price: "$699", description: "Latest smartphone with advanced camera" },
    3: { name: "Tablet", price: "$399", description: "Portable tablet for entertainment" },
  }[id] || { name: "Unknown", price: "N/A", description: "Product not found" };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 99,
        }}
        onClick={() => router.back()}
      />

      {/* Modal content */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          maxWidth: "500px",
          width: "90%",
          zIndex: 100,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>
          {product.name}
        </h2>
        <p style={{ fontSize: "20px", fontWeight: "bold", color: "#2563eb", marginBottom: "16px" }}>
          {product.price}
        </p>
        <p style={{ color: "#666", marginBottom: "24px", lineHeight: "1.6" }}>
          {product.description}
        </p>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => router.back()}
            style={{
              flex: 1,
              padding: "12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Close Modal
          </button>
          <button
            onClick={() => {
              // Force a full page reload to break the interception
              window.location.href = `/product/${id}`;
            }}
            style={{
              flex: 1,
              padding: "12px",
              background: "#f0f0f0",
              color: "#333",
              border: "1px solid #ddd",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Full Page
          </button>
        </div>
      </div>
    </>
  );
}
