export function Settings() {
  return (
    <div className="container">
      <h1>Settings </h1>
      <p>Coming soon...</p>
      {import.meta.env.VITE_BUILD_TIME && (
        <small>
          last updated {Date.parse(import.meta.env.VITE_BUILD_TIME)}
        </small>
      )}
    </div>
  );
}
