import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import QuoteSection from './components/QuoteSection';
import AreasOfFocusPage from './components/AreasOfFocusPage';
import ContactPage from './components/ContactPage';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import GetInvolvedPage from './components/GetInvolvedPage';
import TeamPage from './components/TeamPage';
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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
        <NewsletterSection />
        <Footer />
    </div>
    </Router>
  );
}

export default App;
