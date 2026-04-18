function Trials({ trials }) {
  return (
    <div className="card">
      <h2>🧪 Clinical Trials</h2>

      {trials.map((t, i) => (
        <div key={i} className="item">
          {t.title} <span>({t.status})</span>
        </div>
      ))}
    </div>
  );
}

export default Trials;