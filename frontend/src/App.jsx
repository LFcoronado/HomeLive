import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import PropertyList from './components/PropertyList';
import AddProperty from './components/AddProperty'; // Asegúrate de importar el componente
import FilteredPropertyList from './pages/FilteredPropertyList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/add-property" element={<AddProperty />} /> 
        <Route path="/filtered-properties" element={<FilteredPropertyList />} />
      </Routes>
    </Router>
  );
};

export default App;
