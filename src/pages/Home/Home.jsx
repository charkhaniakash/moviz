import React from 'react';
import "./Home.scss";
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import Popular from './populars/Popular';
import TopRated from './topRated/TopRated';
import Similar from '../details/carosels/Similar';
import Recommendation from '../details/carosels/Recomendation';

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <Trending />
      <Popular/>
      <TopRated/>
     
      
    
    </div>
  )
}

export default Home
