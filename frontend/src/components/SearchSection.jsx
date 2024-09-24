import { useState } from 'react';
import '../styles/SearchSection.css'; // Asegúrate de crear este archivo CSS
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/filtered-properties?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar propiedades..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchSection; // Asegúrate de que esta línea esté presente
