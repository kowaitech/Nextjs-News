import { use } from "react";

export default function ProductPage({ params }) {
  const { id } = use(params);
  const product = {
    1: { name: "Laptop", price: "$999", description: "High-performance laptop for work and gaming" },
    2: { name: "Smartphone", price: "$699", description: "Latest smartphone with advanced camera" },
    3: { name: "Tablet", price: "$399", description: "Portable tablet for entertainment" },
  }[id] || { name: "Unknown", price: "N/A", description: "Product not found" };

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Product #{params.id}</h1>
      <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>{product.name}</h2>
      <p style={{ fontSize: "18px", fontWeight: "bold", color: "#2563eb", marginBottom: "12px" }}>
        {product.price}
      </p>
      <p style={{ color: "#666", marginBottom: "24px", lineHeight: "1.6" }}>
        {product.description}
      </p>
      <p style={{ color: "#999", fontSize: "14px" }}>
        📌 When you opened this via clicking from /products, an intercepting route ({"("}..{")"}product/[id]) captured the navigation and showed a modal instead of a full-page reload.
      </p>
      <p style={{ color: "#999", fontSize: "14px", marginTop: "12px" }}>
        📌 If you opened this URL directly in the address bar, you see the normal full-page view.
      </p>
    </div>
  );
}
