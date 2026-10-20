function ExhibitorCard({ exhibitor }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: 15,
      borderRadius: 8,
      backgroundColor: '#fff'
    }}>
      <h3>{exhibitor.name}</h3>
      <p><b>Category:</b> {exhibitor.category}</p>
      <p><b>Products:</b> {exhibitor.products}</p>
      <p>{exhibitor.description}</p>
      <p><b>Contact:</b> {exhibitor.contact}</p>
    </div>
  );
}

export default ExhibitorCard;