import heroImage from '../assets/images/heroimage.jpg';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-overlay"></div>
      <img src={heroImage} alt="Image of a saluki in the desert" className="hero-image" />
      <div className="hero-text-container">
        <h1 className="hero-text font-lora text-baby-powder">Vento Veloce</h1>
        <h4 className="hero-subtext font-inter text-charcoal">Saluki and Whippet breeder</h4>
      </div>
    </div>
  );
};

export default Hero;


