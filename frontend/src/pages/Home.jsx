import Header from '../components/Header';
import NavMenu from '../components/NavMenu';
import SearchSection from '../components/SearchSection';
import PropertyList from '../components/PropertyList';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <Header />
      <NavMenu />
      <SearchSection />
      <PropertyList />
      <Footer />
    </div>
  );
}

export default Home; // Asegúrate de que esta línea esté presente
