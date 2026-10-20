import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExhibitorCard from '../components/ExhibitorCard';

function ExhibitorSearch() {
  const [exhibitors, setExhibitors] = useState([]);
  const [search, setSearch] = useState('');

  const fetchExhibitors = (searchQuery = '') => {
    const url = searchQuery
      ? `http://localhost:5000/api/exhibitors?search=${searchQuery}`
      : 'http://localhost:5000/api/exhibitors';
    fetch(url)
      .then(res => res.json())
      .then(data => setExhibitors(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchExhibitors();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchExhibitors(search);
  };

  const handleClear = () => {
    setSearch('');
    fetchExhibitors();
  };

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: '0 auto' }}>
      <h1>Search Exhibitors</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 8, marginRight: 10, width: 300 }}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClear} style={{ marginLeft: 5 }}>
          Clear
        </button>
      </form>

      <p><b>Total:</b> {exhibitors.length} exhibitors</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 15
      }}>
        {exhibitors.map(exhibitor => (
          <ExhibitorCard key={exhibitor._id || exhibitor.id} exhibitor={exhibitor} />
        ))}
      </div>

      {exhibitors.length === 0 && <p>No exhibitors found. Try adding some via MongoDB.</p>}

      <p style={{ marginTop: 20 }}>
        <Link to="/">← Back to Home</Link>
      </p>
    </div>
  );
}

export default ExhibitorSearch;