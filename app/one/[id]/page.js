export default async function Page({ params }) {
  const { id } = await params;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Dynamic ID: {id}
      </h1>
    </div>
  );
}
