export default async function DocsPage({ params }) {
  const { slug } = await params;

  console.log("Slug params:", slug);
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-blue-700">Docs Page</h1>

      <p>Slug path: {slug.join("/")}</p>
    </div>
  );
}
