// app/dashboard/layout.js
export default function DashboardLayout({ children, messages, profile, test }) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard (Parallel Routes)</h1>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <aside style={{ width: 320, border: "1px solid #ddd", padding: 16 }}>
          <h3>Messages</h3>
          {messages}
        </aside>

        <main style={{ flex: 1, border: "1px solid #ddd", padding: 16 }}>
          <h3>Profile</h3>
          {test}
        </main>

        <div style={{ flex: 1, border: "1px solid #ddd", padding: 16 }}>
          <h3>Profile</h3>
          {messages}
        </div>
      </div>
      

      <p style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
        Both panels render in parallel within this layout.
      </p>
    </div>
  );
}
