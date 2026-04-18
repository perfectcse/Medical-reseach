function Publications({ publications }) {
  return (
    <div className="card">
      <h2>📚 Publications</h2>

      {publications.map((p, i) => (
        <div key={i} className="item">
          {p.title}
        </div>
      ))}
    </div>
  );
}

export default Publications;