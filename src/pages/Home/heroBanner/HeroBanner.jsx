import React, { useEffect, useState } from 'react';
import './HeroBanner.scss';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadImage/Img';




const HeroBanner = () => {


  const [backGround, setBackGround] = useState("")
  const [query, setQuery] = useState("")
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home)
  console.log(url)

  const { data, loading, error } = useFetch('/movie/upcoming')
  console.log(data)

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
    console.log(bg)
    setBackGround(bg)
  }, [data])

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className="heroBanner">
      <div className="backdrop-img">
        <Img src={backGround} alt="" />
      </div>

      <div className='opacity-layer'></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover.
            Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button className='button'>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
