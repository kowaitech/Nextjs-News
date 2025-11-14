export default async function DocsPage({ params }) {
  const { slug } = await params;
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-blue-700">Docs Page</h1>

      <p>Slug path: {slug.join(" / ")}</p>
    </div>
  );
}
