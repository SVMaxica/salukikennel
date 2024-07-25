
import instagramIcon from '../assets/images/instagram.svg';
import facebookIcon from '../assets/images/fb.svg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-wilder-blue text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-gainsboro">
          <h3 className="text-lg font-bold ">Kennel Vento Veloce</h3>
          <p>1234 Doggo Lane</p>
          <p>12345 Woof City, Country</p>
        </div>
        <div className="flex space-x-4">
          <a href="https://www.instagram.com/roya.the.saluki" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" className="w-8 h-8" />
          </a>
          <a href="https://www.facebook.com/sandra.gustafsson.98" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Facebook" className="w-8 h-8" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
