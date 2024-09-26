import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import '../styles/PropertyList.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    const db = getFirestore();
    const propertiesCollection = collection(db, 'properties');
    try {
      const snapshot = await getDocs(propertiesCollection);
      const fetchedProperties = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProperties(fetchedProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(() => {
    fetchProperties(); // Llama a la función al montar el componente
  }, []); // El efecto se ejecuta solo una vez

  // Filtrar propiedades premium con precio mayor a 5000
  const premiumProperties = properties.filter(property => property.price >= 50000);

  return (
    <div className="carousel">
      <h2>Lista de Propiedades Premium</h2>
      <div className="carousel-container">
        {premiumProperties.length > 0 ? (
          premiumProperties.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-image">
                {property.image && <img src={property.image} alt={property.title} className="property-image" />}
              </div>
              <h3>{property.title}</h3>
            </div>
          ))
        ) : (
          <p>No se encontraron propiedades premium.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
