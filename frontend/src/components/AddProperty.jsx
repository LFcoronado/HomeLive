import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import '../styles/AddProperty.css';
import { Link } from 'react-router-dom';

const AddProperty = () => {
    const [newProperty, setNewProperty] = useState({
        description: "",
        image: "",
        price: 0,
        title: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProperty({ ...newProperty, [name]: value });
    };

    const handleAddProperty = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'properties'), newProperty);
            setNewProperty({ description: "", image: "", price: 0, title: "" });
            alert('Propiedad agregada con éxito');
        } catch (error) {
            console.error("Error al agregar propiedad: ", error);
            alert('Error al agregar propiedad');
        }
    };

    return (
        <div className="add-property-wrapper">
            <div className="form-section">
                <h3>Agregar Nueva Propiedad</h3>
                <form onSubmit={handleAddProperty}>
                    <div className="form-group">
                    <div className="form-group">
                        <label>Imagen (URL):</label>
                        <input
                            type="text"
                            name="image"
                            value={newProperty.image}
                            onChange={handleChange}
                            required
                        />
                    </div>
                        <label>Título:</label>
                        <input
                            type="text"
                            name="title"
                            value={newProperty.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción:</label>
                        <textarea
                            name="description"
                            value={newProperty.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio:</label>
                        <input
                            type="number"
                            name="price"
                            value={newProperty.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </form>
            </div>
            <Link to="/" className="back-to-home">
            <i className="fas fa-home"></i> 
            </Link>
            <div className="preview-section">
                <h3>Vista Previa</h3>
                <div className="preview-card">
                    {newProperty.image ? (
                        <img src={newProperty.image} alt="Vista previa de la propiedad" className="property-image" />
                    ) : (
                        <div className="image-placeholder">Sin Imagen</div>
                    )}
                    <h4>{newProperty.title || "Título de la Propiedad"}</h4>
                    <p>{newProperty.description || "Descripción"}</p>
                    <span className="price">{newProperty.price ? `$${newProperty.price}` : "Precio: $0"}</span>
                </div>
                <button onClick={handleAddProperty} className="add-property-btn">Agregar Propiedad</button>
            </div>
        </div>
    );
};

export default AddProperty;
