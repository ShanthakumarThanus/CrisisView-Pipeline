import { useEffect, useState } from "react";
import Map from "../app/components/Map";

type Incident = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export default function Home() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/incidents")
      .then((res) => res.json())
      .then(setIncidents);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <header style={{ marginBottom: 20 }}>
        <h1>🚨 Crisis View</h1>
        <p>Real-time incident management dashboard</p>
        <nav>
          {/* @ts-ignore */}
          <a href="/admin">Admin Dashboard</a>
        </nav>
      </header>
      <main>
        <Map incidents={incidents} />
      </main>
    </div>
  );
}