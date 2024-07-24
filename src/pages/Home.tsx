import kennelfounderImage from '../assets/images/kennelowner.png';
import Testimonials from '../components/Testimonials';
import InstagramCarousel from '../components/InstagramCarousel';

const Home = () => {
  return (
  <div className='home-wrapper flex flex-col'>
  <div className="home-container flex flex-col md:flex-row items-center justify-between p-4 md:p-8">
      <div className="text-section p-4 md:w-1/2">
        <h4 className="text-ms font-lora text-taupe-gray mb-2 pt-4">Welcome to kennel</h4>
        <h1 className="text-4xl md:text-5xl text-liberty font-lora pb-2 mb-4 mt-4">Vento Veloce</h1>
        <p className="text-base font-inter text-taupe-gray text-left max-w-[320px] mt-4 mb-4 mx-auto">
          I'm Lovisa and together with my friend Stina we breed salukis and whippets.
          Our main focus is to breed Healthy and beautiful dogs with great mentality.
        </p>
      </div>
      <div className="image-section md:w-1/2 flex justify-center md:relative md:-mt-20">
        <img src={kennelfounderImage} alt="Kennel founder" className="md:w-auto max-w-xs" />
      </div>
    </div>
    <Testimonials/>
    <InstagramCarousel />
    </div>
  );
}
export default Home;
