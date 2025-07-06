import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <AboutSection />
      {/* Main content can go here */}
    </div>
  );
}

export default App;
