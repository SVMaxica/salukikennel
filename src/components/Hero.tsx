import heroImage from '../assets/images/heroimage.jpg';




const Hero = () => {
  return (
    <div className="relative w-full h-[60vh] lg:h-[70vh] xl:h-[80vh] overflow-hidden z-0">
      <div className="hero-overlay absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[rgba(40,62,109,0.71)] to-transparent z-20"></div>
      <img src={heroImage} alt="Image of a saluki in the desert" className="absolute top-0 left-0 w-full h-full object-cover" />
      <div className="absolute top-[35%] md:top-[32%]  xl:top-[25%] right-[5%] md:right-[8%] w-[400px] h-[60px] xl:w-[600px] text-right z-30">
      <h1 className="text-5xl md:text-6xl xl:text-8xl font-lora text-baby-powder">Vento Veloce</h1>
      <h4 className="text-base md:text-xl xl:text-3xl font-inter text-charcoal">Saluki and Whippet breeder</h4>
      </div>
      {/* <div className="absolute top-[33%] md:top-[30%]  xl:top-[28%] right-[5%] md:right-[8%] w-[400px] h-[60px] xl:w-[600px] text-right z-30">
        <h1 className="text-5xl md:text-6xl xl:text-8xl font-lora text-baby-powder">Vento Veloce</h1>
      </div>
      <div className="absolute top-[43%] md:top-[42%] right-[5%] md:right-[8%] w-[300px] h-[40px] xl:w-[500px] text-right z-2">
        <h4 className="text-base md:text-xl xl:text-3xl font-inter text-charcoal">Saluki and Whippet breeder</h4>
      </div> */}
    </div>
  );
};

export default Hero;