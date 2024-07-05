import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dogs from './pages/Dogs';
import Puppies from './pages/Puppies';
import Contact from './pages/Contact';
import Posts from './pages/Posts';
import Hero from './components/Hero';
import './App.css';

function App() {
  return (
    <Router>
      <div className="text-center">
        <Navbar />
        <Hero />
        <Routes> {/* Switch is replaced by Routes in v6 */}
          <Route path="/" element={<Home />} />
          <Route path="/dogs" element={<Dogs />} />
          <Route path="/puppies" element={<Puppies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

