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

  return (
    <div className="carousel">
      <h2>Lista de Propiedades</h2>
      <div className="carousel-container">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.id} className="property-card">
              <h3>{property.title}</h3>
              <p>{property.description}</p>
              <p>Precio: ${property.price}</p>
              {property.image && <img src={property.image} alt={property.title} className="property-image" />}
            </div>
          ))
        ) : (
          <p>No se encontraron propiedades.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
