import kennelfounderImage from '../assets/images/kennelowner.png';

const Home = () => {
  return (
  <div className="home-container flex flex-col md:flex-row items-center justify-between p-4 md:p-8">
      <div className="text-section p-4 md:w-1/2">
        {/* <h5 className="text-sm font-inter mb-2">Welcome to kennel</h5> */}
        <h1 className="text-4xl text-liberty font-lora pb-4 mb-4 mt-4">Welcome</h1>
        <p className="text-base font-inter text-left mt-4 mb-4">
          I'm Lovisa and together with my friend Stina we breed salukis and whippets.
          Our main focus is to breed Healthy and beautiful dogs with great mentality.
        </p>
      </div>
      <div className="image-section md:w-1/2 flex justify-center md:relative md:-mt-20">
        <img src={kennelfounderImage} alt="Kennel founder" className="md:w-auto max-w-xs" />
      </div>
      
    </div>
  );
}
export default Home;
