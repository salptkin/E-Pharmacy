import React from "react";
import MainBanner from "./MainBanner/MainBanner";
import Banner from "./Banner/Banner";
import Reviews from "./Reviews/Reviews";
import NearestStores from "./NearestStores/NearestStores";
import PromoBanner from "./PromoBanner/PromoBanner";

const Home = () => {
  return (
    <>
    <MainBanner />
    <Banner />
    <NearestStores /> 
    <PromoBanner />
    <Reviews />
    </>
  );
};

export default Home;