import { Scanner } from "@yudiel/react-qr-scanner";

export function App() {
  return (
    <>
      <h1>Attendance</h1>
      <Scanner
        onScan={(ውጤቶች) => ውጤቶች.map((ውጤት) => alert(JSON.stringify(ውጤት)))}
        styles={{ container: { width: "100%", height: "100%" } }}
      />
    </>
  );
}
