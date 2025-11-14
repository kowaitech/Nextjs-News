"use client"; 

export default function Error({ error, reset }) {
    console.log(error,"throeing error")
  return (
    <div className="container text-center py-5">
      <h2 className="text-danger fw-bold">⚠️ Oops, something went wrong!</h2>
      <p className="text-muted">{error.message || "Unable to load news."}</p>
      <button className="btn btn-outline-primary mt-3" onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}
