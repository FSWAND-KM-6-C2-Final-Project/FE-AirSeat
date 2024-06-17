import bangkokSlider from "../images/bangkok-slider.png";

const Banner = () => {
  return (
    <div className=" lg:min-h-[40vh] md:min-h-[30vh] sm:min-h-[10vh] flex flex-col justify-center items-center">
      <div className="lg:bg-customBlue3 md:bg-customBlue3 sm:bg-none lg:h-[160px] md:h-[100px] sm:h-0 flex justify-center items-center">
        <img
          className="object-cover lg:w-[80%] md:w-[75%] sm:w-[70%]"
          src={bangkokSlider}
          alt="Slider"
        />
      </div>
    </div>
  );
};

export default Banner;
