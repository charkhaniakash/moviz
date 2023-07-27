import React, { useEffect, useRef, useState } from 'react'
import "./carouset.scss"
import ContentWrapper from '../contentWrapper/ContentWrapper'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Img from '../lazyLoadImage/Img'
import { useSelector } from 'react-redux'
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from '../circleRating/CircleRating'
import Genres from '../genres/Genres'


const Carousel = ({ data, loading, endPoint , title  }) => {

  console.log(title)
  

  const navigate = useNavigate()

  const { url } = useSelector((state) => state.home)

  console.log(url)


//   const count = useRef()

//   const navigation = (dir) => {
//     const container = count.current



//     const scrollAmount = dir=== "left" ? container.scrollLeft - (container.offsetWidth + 20) : (container.scrollLeft + (container.offsetWidth + 20))


//     container.scrollTo({
//       left: scrollAmount,
//       behaivour:"smooth",
//     })
// }


const count = useRef()


const navigation = (dir)=>{
  const container = count.current
  console.log(container)

  container.scrollTo({
    left: dir==="left"? container.scrollLeft-(container.offsetWidth+20) : container.scrollLeft+(container.offsetWidth+20),
    behaviour:"smooth"
  })
  
}


function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${month} ${year}`;
}

const skItem = () => {
  return (
    <div className="skeletonItem">
      <div className="posterBlock skeleton"></div>
      <div className="textBlock">
        <div className="title skeleton"></div>
        <div className="date skeleton"></div>
      </div>
    </div>
  )
}

function round(num) {
  return num.toFixed(1)
}

return (
  <div className='carousel'>
    <ContentWrapper>

    {title ? <div className='carouselTitle'>{title}</div> : "" }
      <AiFillCaretLeft style={{ color: 'red' }}
        className="carouselLeftNav arrow"
        onClick={()=>navigation('left')}
      />
      <AiFillCaretRight style={{ color: 'red' }}
        className="carouselRighttNav arrow"
        onClick={()=>navigation('right')}

      />

      {!loading ? (
        <div className='carouselItems ' ref={count} >
          {data?.map((item) => {
            const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback
            return (
              <div className='carouselItem' key={item.id} onClick={()=> navigate(`/${item?.media_type || endPoint}/${item?.id}`)} >
                <div className='posterBlock' >
                  <Img src={posterUrl} alt='' />
                  <CircleRating rating={round(item?.vote_average)} />
                  <Genres data={item?.genre_ids} />
                </div>

                <div className='textBlock' >
                  <span className='title'>
                    {item?.title}
                  </span>

                  <span className='date'>
                    {formatDate(item?.release_date)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className='loadingSkeleton' >
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
        </div>
      )}
    </ContentWrapper>
  </div>
)
}

export default Carousel


