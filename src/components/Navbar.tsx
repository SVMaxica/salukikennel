import { NavLink } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import homeIcon from '../assets/images/homeIcon.svg';
import contactIcon from '../assets/images/contactIcon.svg';
import dogsIcon from '../assets/images/dogsIcon.svg';
import puppiesIcon from '../assets/images/puppiesIcon.svg';
import postsIcon from '../assets/images/postsIcon.svg';

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const controlNavbar = useCallback(() => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScroll(currentScroll);
  }, [lastScroll]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleScroll = () => {
      if (mediaQuery.matches) {
        window.addEventListener('scroll', controlNavbar);
      } else {
        window.removeEventListener('scroll', controlNavbar);
        setShow(true);
      }
    };

    handleScroll(); // Initialize scroll handling
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
      window.removeEventListener('resize', handleScroll);
    };
  }, [controlNavbar]);

  return (
    <nav className={`fixed inset-x-0 bottom-0 md:absolute md:top-0 bg-white md:bg-transparent p-2 md:p-5 z-50 transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}`}>
      <div className="flex justify-around md:justify-between md:w-auto mx-auto md:mx-0 md:pr-100">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center md:flex-row ${isActive ? 'border-t-4 md:border-t-0 md:border-b-2 border-wild-blue-yonder md:border-almond p-1 md:rounded-none' : ''}`
          }
        >
          <img src={homeIcon} alt="Home" className="h-6 w-6 md:hidden" />
          <span className="block text-xs md:text-sm text-gray-web md:text-baby-powder">Home</span>
        </NavLink>
        <NavLink
          to="/puppies"
          className={({ isActive }) =>
            `flex flex-col items-center md:flex-row ${isActive ? 'border-t-4 md:border-t-0 md:border-b-2 border-wild-blue-yonder md:border-almond p-1 md:rounded-none' : ''}`
          }
        >
          <img src={puppiesIcon} alt="Puppies" className="h-6 w-6 md:hidden" />
          <span className="block text-xs md:text-sm text-gray-web md:text-baby-powder">Puppies</span>
        </NavLink>
        <NavLink
          to="/dogs"
          className={({ isActive }) =>
            `flex flex-col items-center md:flex-row ${isActive ? 'border-t-4 md:border-t-0 md:border-b-2 border-wild-blue-yonder md:border-almond p-1 md:rounded-none' : ''}`
          }
        >
          <img src={dogsIcon} alt="Dogs" className="h-6 w-6 md:hidden" />
          <span className="block text-xs md:text-sm text-gray-web md:text-baby-powder">Dogs</span>
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            `flex flex-col items-center md:flex-row ${isActive ? 'border-t-4 md:border-t-0 md:border-b-2 border-wild-blue-yonder md:border-almond p-1 md:rounded-none' : ''}`
          }
        >
          <img src={postsIcon} alt="Posts" className="h-6 w-6 md:hidden" />
          <span className="block text-xs md:text-sm text-gray-web md:text-baby-powder">Posts</span>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex flex-col items-center md:flex-row ${isActive ? 'border-t-4 md:border-t-0 md:border-b-2 border-wild-blue-yonder md:border-almond p-1 md:rounded-none' : ''}`
          }
        >
          <img src={contactIcon} alt="Contact" className="h-6 w-6 md:hidden" />
          <span className="block text-xs md:text-sm text-gray-web md:text-baby-powder">Contact</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;

