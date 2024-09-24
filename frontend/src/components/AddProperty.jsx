import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Asegúrate de que esta ruta sea correcta
import '../styles/AddProperty.css';

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
        e.preventDefault(); // Prevenir el envío del formulario

        try {
            await addDoc(collection(db, 'properties'), newProperty);
            // Reinicia el formulario después de agregar
            setNewProperty({ description: "", image: "", price: 0, title: "" });
            alert('Propiedad agregada con éxito');
        } catch (error) {
            console.error("Error al agregar propiedad: ", error);
            alert('Error al agregar propiedad');
        }
    };

    return (
        <div className="add-property-container">
            <div className="add-property-card">
                <h3>Agregar Nueva Propiedad</h3>
                <form onSubmit={handleAddProperty}>
                    <div className="form-group">
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
                        <label>Imagen (URL):</label>
                        <input
                            type="text"
                            name="image"
                            value={newProperty.image}
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
                    <button type="submit" className="add-property-btn">Agregar Propiedad</button>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;
