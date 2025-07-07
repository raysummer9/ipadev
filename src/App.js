import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import QuoteSection from './components/QuoteSection';
import AreasOfFocusPage from './components/AreasOfFocusPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <AboutSection />
              <QuoteSection />
            </>
          } />
          <Route path="/areas-of-focus" element={<AreasOfFocusPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
