import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import '../styles/FilteredPropertyList.css';
import { Link } from 'react-router-dom';

const FilteredPropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [titleFilter, setTitleFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [selectedProperty, setSelectedProperty] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query') || '';

    useEffect(() => {
        fetchProperties();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [properties, titleFilter, priceFilter, query]);

    const fetchProperties = async () => {
        const db = getFirestore();
        const propertiesCollection = collection(db, 'properties');
        try {
            const snapshot = await getDocs(propertiesCollection);
            const fetchedProperties = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProperties(fetchedProperties);
        } catch (error) {
            console.error('Error obteniendo propiedades:', error);
        }
    };

    const applyFilters = () => {
        const filtered = properties.filter(property => {
            const matchesQuery = query ? (
                property.title.toLowerCase().includes(query.toLowerCase()) ||
                property.description.toLowerCase().includes(query.toLowerCase())
            ) : true;
            const matchesTitle = titleFilter ? (
                property.title.toLowerCase().includes(titleFilter.toLowerCase())
            ) : true;
            const matchesPrice = priceFilter ? (
                property.price <= parseFloat(priceFilter)
            ) : true;

            return matchesQuery && matchesTitle && matchesPrice;
        });
        setFilteredProperties(filtered);
    };

    const openModal = (property) => {
        setSelectedProperty(property);
    };

    const closeModal = () => {
        setSelectedProperty(null);
    };

    return (
        <div className="filtered-properties-container">
            <Link to="/" className="back-to-home">
                <i className="fas fa-home"></i> 
            </Link>
            <div className="filtered-properties-filter-bar">
                <input
                    type="text"
                    placeholder="Filtrar por título"
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                    className="filter-title-input"
                />
                <input
                    type="number"
                    placeholder="Filtrar por precio máximo"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="filter-price-input"
                />
            </div>

            <div className="filtered-properties-carousel">
                {Array.from({ length: Math.ceil(filteredProperties.length / 6) }, (_, index) => (
                    <div key={index} className="filtered-properties-carousel-item">
                        {filteredProperties.slice(index * 6, (index + 1) * 6).map(property => (
                            <div 
                                key={property.id} 
                                className="filtered-property-card" 
                                onClick={() => openModal(property)}
                            >
                                <div className="filtered-property-image">
                                    <img src={property.image} alt={property.title} />
                                </div>
                                <div className="filtered-property-info">
                                    <h3>{property.title}</h3>
                                    <p>{property.description}</p>
                                    <p className="filtered-property-price">Precio: ${property.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {filteredProperties.length === 0 && (
                <p className="filtered-properties-no-results">No se encontraron propiedades con esa búsqueda.</p>
            )}

            {selectedProperty && (
                <div className="filtered-properties-modal-overlay">
                    <div className="filtered-properties-modal-content">
                        <button className="filtered-properties-close-btn" onClick={closeModal}>Seguir viendo</button>
                        <h2>{selectedProperty.title}</h2>
                        <img src={selectedProperty.image} alt={selectedProperty.title} className="filtered-property-modal-image" />
                        <p>Precio: ${selectedProperty.price}</p>
                        <p>Ubicación: {selectedProperty.location}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilteredPropertyList;
