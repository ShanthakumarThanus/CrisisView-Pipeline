export default function AdminDashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>
      <nav>
        {/* @ts-ignore */}
        <a href="/">← Back to Map</a>
        <ul>
          {/* @ts-ignore */}
          <li><a href="/admin/incidents">Incidents</a></li>
          {/* @ts-ignore */}
          <li><a href="/admin/techniciens">Techniciens</a></li>
          {/* @ts-ignore */}
          <li><a href="/admin/interventions">Interventions</a></li>
        </ul>
      </nav>
    </div>
  );
}