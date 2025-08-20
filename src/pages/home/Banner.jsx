import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Sample slides (replace with your real event images & titles)
const slides = [
  {
    title: "Marathon 2025",
    description: "Join the city marathon and test your endurance!",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hcmF0aG9ufGVufDB8fDB8fHww",
  },
  {
    title: "Athletic Championship",
    description: "Compete with top athletes and win prizes!",
    image:
      "https://images.unsplash.com/photo-1641628878413-5ef336e3a350?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF0aGxldGljJTIwY2hhbXBpb24lMjB0cm9waHl8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Yoga & Fitness Event",
    description: "Improve your flexibility and overall health.",
    image:
      "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxZb2dhJTIwJTI2JTIwRml0bmVzcyUyMEV2ZW50fGVufDB8fDB8fHww",
  },
];

const Banner = () => {
  return (
    <div className="w-full mt-6">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        emulateTouch
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="object-cover w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl shadow-2xl"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 rounded-2xl flex flex-col justify-end p-8 md:p-16 lg:p-20">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-white text-md md:text-lg lg:text-xl mb-6 drop-shadow-md">
                {slide.description}
              </p>

              {/* Optional Book Now button */}
              {/* <button className="bg-gradient-to-r from-[#A0C878] to-[#899c5f] hover:from-[#899c5f] hover:to-[#A0C878] text-white font-semibold px-6 py-3 rounded-xl w-max shadow-lg transition">
                Book Now
              </button> */}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
