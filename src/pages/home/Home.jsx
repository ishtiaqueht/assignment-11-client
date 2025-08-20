import React from "react";
import Banner from "./Banner";
import FeaturedEvents from "./FeaturedEvents";
import PopularSports from "./PopularSports";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <section className="mb-24">
        <Banner></Banner>
      </section>
      <section className="mb-24">
        <FeaturedEvents></FeaturedEvents>
      </section>
      <section className="mb-24">
        <PopularSports></PopularSports>
      </section>
      <section className="mb-24">
        <Testimonials></Testimonials>
      </section>
    </div>
  );
};

export default Home;
